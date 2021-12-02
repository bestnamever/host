import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OptionList} from 'src/app/core/models/option-list';
import {PhoneProperties} from 'src/app/core/models/phone-properties';
import {PhoneService} from 'src/app/core/services/phone.service';
import {DeleteComfirmComponent} from '../delete-comfirm/delete-comfirm.component'
import {PhoneType} from "../../../core/models/phone-type";
import {PhoneDirection} from "../../../core/models/phone-direction";

@Component({
  selector: 'app-layout-screen',
  templateUrl: './layout-screen.component.html',
  styleUrls: ['./layout-screen.component.scss']
})


export class LayoutScreenComponent implements OnInit, OnDestroy {

  // phone options
  phoneOptions: PhoneProperties | undefined;

  // phone selection
  phoneSelected: string | undefined;

  //page name and setHomepge
  homepage: string;

  //custom width and heigth
  customWidth: number;
  customHeight: number;

  //custom enable
  // showCustomSize: boolean;

  // label texts
  setHomepage: string;
  isInNavigation: string;
  customScreenSize: string;
  delete_component: string;
  delete_title: string;
  safeSpace: string;

  // phone screen options
  phoneOptionList: OptionList[];
  phoneOrientation: PhoneDirection | undefined;

  // Advanced settings enabled
  showAdvanced : boolean | null;

  constructor(public dialog: MatDialog, private phoneSetting: PhoneService) {

    this.homepage = "Homepage"
    this.customWidth = 640
    this.customHeight = 480
    this.customScreenSize = "Use custom screen size";
    this.safeSpace = "Display safe-space in preview"
    this.setHomepage = "Set Homepage"
    this.isInNavigation = "Show in navigation"
    this.delete_component = "Homepage"
    this.delete_title = "page"
    this.showAdvanced = null;
    // this.showCustomSize = false;

    this.phoneOptionList = []
    // this.phoneSelected = "Apple IPhone 13";
/*      { value: "0", viewValue: "SAMSUNG_S20" },
      { value: "1", viewValue: "SAMSUNG_S10" },
    ]*/
    for(const phoneString in Object.keys(PhoneType)) {
      if(PhoneType[phoneString] != null) {
        this.phoneOptionList.push({ value: phoneString, viewValue: PhoneType[phoneString]});
      }
    }
  }


  ngOnInit(): void {
    this.phoneSetting.currentPhoneState.subscribe(phone => {
      console.log("this.phoneSelected: [" + this.phoneSelected + "]");
      console.log("phone.phoneType: [" + phone.phoneType + "]");
      if(phone.phoneType !== undefined && this.phoneSelected != phone.phoneType.toString() && this.phoneSelected != null) {
        if(PhoneType[phone.phoneType].includes('Desktop')) {
          this.changeOrientation('LANDSCAPE');
        } else {
          this.changeOrientation('PORTRAIT');
        }
      }
      this.phoneOptions = phone;
      this.phoneSelected = phone.phoneType?.toString();
      console.log("Now selected [" + phone.phoneType?.toString() + "]");
      // this.phoneSelected = this.phoneOptions.phoneType === 0 ? "0" : "1";
      console.log(this.phoneSelected)
    });

    this.phoneSetting.currentOrientationState.subscribe(orientation => {
      this.phoneOrientation = orientation;
      console.log("Phone Orientation is now " + PhoneDirection[orientation]);
      console.log("Orientation used in Frontend is [" + orientation + "]");
    });
  }

  ngOnDestroy() {
  }


  //selection change
  change(phoneType: string) {
    this.phoneSetting.changePhone(parseInt(phoneType))
  }

  changeOrientation(direction: string) {
    switch (direction) {
      case "PORTRAIT": this.phoneSetting.changeOrientation(PhoneDirection.PORTRAIT); break;
      case "LANDSCAPE": this.phoneSetting.changeOrientation(PhoneDirection.LANDSCAPE); break;
    }
  }

  updatePhoneCustomSize() {
    /*if(this.customHeight > this.customWidth) {
      this.phoneOrientation = PhoneDirection.PORTRAIT;
    } else if(this.customWidth > this.customHeight) {
      this.phoneOrientation = PhoneDirection.LANDSCAPE;
    }*/
    if(this.customHeight > 0 && this.customWidth > 0) {
      console.log("Updating Phone Size to " + this.customWidth + 'x' + this.customHeight);
      this.phoneSetting.changePhone(undefined, this.customWidth, this.customHeight);
    }
  }




  showHideCustom() {
    // this.showCustomSize = !this.showCustomSize;
    if(this.phoneOptions?.phoneType == undefined) {
      console.log("Switching back to Apple IPhone 13!");
      this.phoneSetting.changePhone(PhoneType["Apple IPhone 13"]);
    } else {
      console.log("Switching to Custom Screen Size!");
      this.phoneSetting.changePhone(undefined, this.customWidth, this.customHeight);
    }
  }


  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteComfirmComponent, { width: '30%', data: { title: this.delete_title, component: this.delete_component } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

