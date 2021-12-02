import { Component, OnInit } from '@angular/core';
import {PreviewService} from "../../../core/services/preview.service";

@Component({
  selector: 'app-layout-tab',
  templateUrl: './layout-tab.component.html',
  styleUrls: ['./layout-tab.component.scss']
})
export class LayoutTabComponent implements OnInit {

  selectedIndex: number;

  constructor(private previewService: PreviewService) {
    this.selectedIndex = 1;
  }

  ngOnInit(): void {
    this.previewService.currentlySelectedWidgetState.subscribe((data) => {
      if(data != null) {
        this.selectedIndex = 0;
      }
    });
  }
}
