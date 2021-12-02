import {Component, OnDestroy, OnInit} from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { DesignPage } from 'src/app/core/models/design-page';
import { DesignService } from 'src/app/core/services/design.service';
import { PreviewService } from "../../../core/services/preview.service"
import { OptionList } from 'src/app/core/models/option-list';
import {skip} from "rxjs/operators";
import {Subscription} from "rxjs";
import { AttributePickerControlService } from 'src/app/core/services/attributePickerControl.service';

@Component({
  selector: 'app-layout-rightbar-components',
  templateUrl: './layout-rightbar-components.component.html',
  styleUrls: ['./layout-rightbar-components.component.scss']
})
export class LayoutRightbarComponentsComponent implements OnInit, OnDestroy {

  //page value
  designPage: DesignPage | undefined

  // selected widget
  widget: GridsterItem | undefined

  // selected asset
  assetSelected: string | undefined

  // selected measurement
  measurementSelected: string | undefined

  assets: OptionList[]

  //temperature properties
  tempProperties: OptionList[]

  //watt properties
  wattProperties: OptionList[]

  //used assets



  // text: string

  private selectedWidgetSub: Subscription;
  private currentDesignSub: Subscription;

  constructor(private data: PreviewService, private outputData: DesignService, private attributePicker: AttributePickerControlService) {
    this.assets = [
      { value: "ALTA Wireless Temperature Sensor", viewValue: "ALTA Wireless Temperature Sensor" },
      { value: "Govee Thermometer", viewValue: "Govee Thermometer" },
      { value: "Govee WIFI Thermometer", viewValue: "Govee WIFI Thermometer" },
      { value: "Zigbee 2500W", viewValue: "Zigbee 2500W" },
    ]

    this.tempProperties = [
      { value: "°C", viewValue: "Temperature(°C)" },
      { value: "°F", viewValue: "Temperature(°F)" },
      { value: "K", viewValue: "Temperature(K)" }
    ]

    this.wattProperties = [
      { value: "KW", viewValue: "KILOWATT" },
      { value: "W", viewValue: "WATT" },
    ]

    // set value on right side bar
    this.selectedWidgetSub = this.data.currentlySelectedWidgetState.subscribe(widget => (
      this.widget = widget?.gridsterItem,
      this.assetSelected = widget?.widgetData.values[0].asset,
      this.measurementSelected = widget?.widgetData.values[0].measurement,
      console.log("property is ::" + this.measurementSelected)
    ))

    this.currentDesignSub = this.outputData.currentDesignState.subscribe(designpage => {
      this.designPage = JSON.parse(JSON.stringify(designpage));
    })

    this.attributePicker.lastSelectionChange.subscribe((value) => {
      console.log("[RightbarComponents]", "The selected attribute was changed", value);
      this.setNewValues(value);
    })

    // this.text = "example"

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectedWidgetSub.unsubscribe();
    this.currentDesignSub.unsubscribe();
  }

  //get type of properties
  getPropertyType(): boolean {
    return (this.measurementSelected === "KW" || this.measurementSelected === "W") ? true : false
  }

  //change value
  setValue(key: string, value: string) {

    this.designPage?.positions.forEach(element => {
      if (element.id == this.widget?.id) {
        if (key === "asset") {
          element.element.values[0].asset = value
        }
        else if (key === "measurement") {
          element.element.values[0].measurement = value
        }
      }
    })

    if (this.designPage != null)
      this.outputData.updateData(this.designPage)
  }

  //selection change
  change(chosenkey: string, chosenValue: string) {
    console.log(chosenValue)
    this.setValue(chosenkey, chosenValue)
  }

  openPicker() : void {
    this.attributePicker.setIsOpened(true);
  }

  // setCardSetting(message: string) {
  //   this.text = message;
  // }

  setNewValues(newValues : any) {
    // Get all used assets
    const assets = <any[]>this.outputData.currentAssets;

    // Get the selected asset
    const selectedAsset = assets.find((x : any) => x.id === newValues.assetId);
    const assetName = selectedAsset.name;

    // Get the selected attribute on the found asset
    const selectedAttribute = <any>Object.values(selectedAsset.attributes).find((x : any) => x.name === newValues.attributeName)

    // Get the value of the selected attribute
    const attributeValue = selectedAttribute.value;

    console.log("[RightbarComponents]", "Found following value for this attribute", selectedAttribute, attributeValue);

    // Update values in preview
  }

}


