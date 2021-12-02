import {Component, OnDestroy, OnInit} from '@angular/core';
import {DesignService} from "../../../core/services/design.service";
import {take} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-preview-updatedtext',
  templateUrl: './preview-updatedtext.component.html',
  styleUrls: ['./preview-updatedtext.component.scss']
})
export class PreviewUpdatedtextComponent implements OnInit, OnDestroy {

  // Variables
  designUpdatedAt: string | undefined;
  private currentDesignSub: Subscription;

  // Constructor
  constructor(private designService: DesignService) {
    this.currentDesignSub = this.designService.currentDesignState.pipe(take(1)).subscribe(() => {
      this.designUpdatedAt = new Date().toLocaleString();
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.currentDesignSub.unsubscribe();
  }

}
