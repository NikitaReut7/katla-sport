import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionListItem } from '../models/hive-section-list-item';
import { HiveSectionService } from '../services/hive-section.service';
import { HiveService } from '../services/hive.service';

@Component({
  selector: 'app-hive-section-list',
  templateUrl: './hive-section-list.component.html',
  styleUrls: ['./hive-section-list.component.css']
})
export class HiveSectionListComponent implements OnInit {

  hiveId: number;
  hiveSections: Array<HiveSectionListItem>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
    private hiveService: HiveService
  ) { }

  ngOnInit() {
  this.route.params.subscribe(p => {
    this.hiveId = p['id'];
    this.hiveService.getHiveSections(this.hiveId).subscribe(s => this.hiveSections = s);
  })
}
  onUndelete(hiveSectionId: number) {
  var hiveSection = this.hiveSections.find(h => h.id == hiveSectionId);
  this.hiveSectionService.setHiveSectionStatus(hiveSectionId, false).subscribe(c => hiveSection.isDeleted = false);
  }
  
   onDelete(hiveSectionId: number) {
    var hiveSection = this.hiveSections.find(h => h.id == hiveSectionId);
    this.hiveSectionService.setHiveSectionStatus(hiveSectionId, true).subscribe(c => hiveSection.isDeleted = true);
  }
}