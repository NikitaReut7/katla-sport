import { Component, OnInit } from '@angular/core';
import { HiveSection } from '../models/hive-section';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionService } from '../services/hive-section.service';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {
  storeHiveId : number;
  hiveSection = new HiveSection(0, "", "", 0 ,false, "");
  existed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.storeHiveId = p['id'];

      if (p['sectionId'] === undefined) 
      {
        this.hiveSection.storeHiveId = this.storeHiveId;
        return;
      }
      this.hiveSectionService.getHiveSection(p['sectionId']).subscribe(s => this.hiveSection = s);
      this.existed = true;
    });
  }

  navigateToSections() {
    if (this.storeHiveId === undefined)
    {
      this.storeHiveId = this.hiveSection.storeHiveId;
    }
    this.router.navigate([`/hive/${this.storeHiveId}/sections`]);
  }

  onCancel() {
    this.navigateToSections();
  }

  onSubmit() {
    if (this.existed) {
      this.hiveSectionService.updateHiveSection(this.hiveSection).subscribe(h => this.navigateToSections());
    } else {
      this.hiveSectionService.addHiveSection(this.hiveSection).subscribe(h => this.navigateToSections());
    }
  }

  onDelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, true).subscribe(h => this.hiveSection.isDeleted = true);
  }

  onUndelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, false).subscribe(h => this.hiveSection.isDeleted = false);
  }

  onPurge() {
    this.hiveSectionService.deleteHiveSection(this.hiveSection.id).subscribe(h => this.navigateToSections());
  }
}
