import { Component, OnInit } from '@angular/core';
import { OpenremoteService } from 'src/app/core/services/openremote.service';
import { AttributePickerControlService } from 'src/app/core/services/attributePickerControl.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-attribute-picker',
  templateUrl: './attribute-picker.component.html',
  styleUrls: ['./attribute-picker.component.scss']
})


export class AttributePickerComponent implements OnInit {

  // Custom variables
  isOpened : boolean;
  selectedAsset : string;
  selectedAttribute : string;


  constructor(private attributePickerControl : AttributePickerControlService) {
   
    // Set initial values from the attribute picker control service
    this.isOpened = this.attributePickerControl.isOpened;
    this.selectedAsset = this.attributePickerControl.selectedAsset;
    this.selectedAttribute = this.attributePickerControl.selectedAttribute;

    // Subscribe to service variables to handle changes
    this.attributePickerControl.isOpenedChange.subscribe(value => {
      this.isOpened = value;
    });
    
    this.attributePickerControl.selectedAssetChange.subscribe(value => {
      this.selectedAsset = value;
    });

    this.attributePickerControl.selectedAttributeChange.subscribe(value => {
      this.selectedAttribute = value;
    })
  }

  ngOnInit() {
  }

  closePicker() : void {
    this.attributePickerControl.setSelectedAsset("");
    this.attributePickerControl.setSelectedAttribute("");
    this.attributePickerControl.setIsOpened(false);
  }

  submitSelection(): void{
    
    // Take no action if there no attribute or asset is selected
    if(this.selectedAsset === "" || this.selectedAttribute === "") return;

    console.log("[AttributePicker]", "Closing pop-up with following selection:", this.selectedAsset, this.selectedAttribute);

    this.attributePickerControl.setLastSelection(this.selectedAsset, this.selectedAttribute);

    this.closePicker();

  }
}
