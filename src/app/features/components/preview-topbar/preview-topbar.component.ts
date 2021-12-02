import {Component, Input, OnInit} from '@angular/core';
import {PhoneProperties} from "../../../core/models/phone-properties";
import {PhoneDirection} from "../../../core/models/phone-direction";

@Component({
  selector: 'app-preview-topbar',
  templateUrl: './preview-topbar.component.html',
  styleUrls: ['./preview-topbar.component.scss']
})
export class PreviewTopbarComponent implements OnInit {

  @Input() toptext: string | undefined;
  @Input() fullscreen: boolean | undefined;
  @Input() phoneOptions: PhoneProperties | undefined;
  @Input() phoneOrientation: PhoneDirection | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getWidth(): string {
    switch (this.fullscreen) {
      case true:
        return "100vw";
        break;
      default:
        return "100%";
    }
  }

  isInPortraitMode(): boolean {
    return this.phoneOrientation == PhoneDirection.PORTRAIT;
  }

  getNotchPosition(): string {
    if(this.phoneOptions?.customPosition != null) {
      return this.phoneOptions?.customPosition;
    } else {
      return 'center'
    }
  }
  getNotchMarginTop(): string {
    if(this.phoneOptions?.smallNotchCustomTopMargin != null) {
      return this.phoneOptions?.smallNotchCustomTopMargin;
    } else {
      return '4px';
    }
  }

}
