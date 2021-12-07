import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { WidgetComponent } from 'src/app/core/models/widget-component';
import { PreviewService } from "../../../core/services/preview.service"
import { DesignService } from "../../../core/services/design.service";
import { GridsterItem } from 'angular-gridster2';
import { Design } from 'src/app/core/models/design';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComfirmComponent } from '../delete-comfirm/delete-comfirm.component';
import { DeletionService } from 'src/app/core/services/deletion.service';
import {DesignPosition} from "../../../core/models/design-position";
import { DialogComponent } from '../dialog/dialog.component';

interface width {
  value: number
  viewValue: string
}

@Component({
  selector: 'app-layout-component-setting',
  templateUrl: './layout-component-setting.component.html',
  styleUrls: ['./layout-component-setting.component.scss']
})
export class LayoutComponentSettingComponent implements OnInit, OnDestroy {

  //page value
  design: Design | undefined

  // selected widget
  selectedWidget: WidgetComponent | null

  // selected widget's GridsterItem
  selectedGridsterItem: GridsterItem | undefined

  // selected widget type
  type: number | undefined;

  // selected widget label text
  text: string | undefined;

  // selected widget value
  value: string | undefined;

  delete_component: string;
  delete_title: string;
  widths: width[];
  widthValue: number;

  private selectedWidgetSub: Subscription;
  private currentDesignSub: Subscription;

  constructor(private inputData: PreviewService, private outputData: DesignService, public dialog: MatDialog, private deletionService: DeletionService) {

    this.selectedWidget = null

    this.delete_component = "Component"
    this.delete_title = "Delete this Component"

    this.text = "Room Temperature"
    this.widths = [
      { value: 30, viewValue: '30%' },
      { value: 50, viewValue: '50%' },
      { value: 66, viewValue: '66%' },
      { value: 100, viewValue: '100%' }
    ]
    this.widthValue = 0

    // set value on right side bar
    this.selectedWidgetSub = this.inputData.currentlySelectedWidgetState.subscribe(widget => {
      this.selectedWidget = widget;
      this.selectedGridsterItem = widget?.gridsterItem;
      this.type = widget?.widgetData.widgetType;
      this.text = widget?.widgetData.text;
      if(widget?.widgetData.values != null && widget.widgetData.values.length > 0) {
        this.value = widget?.widgetData.values[0].value;
      }
      console.log("value is : " + this.value)
    })

    this.currentDesignSub = this.outputData.currentDesignState.subscribe(designpage => {
      this.design = JSON.parse(JSON.stringify(designpage))
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.selectedWidgetSub.unsubscribe();
    this.currentDesignSub.unsubscribe();
  }

  // select width by chips
  selectionOnChip(chip: MatChip, value: number) {
    this.widthValue = value
    chip.toggleSelected();
  }

  //select value by input textarea
  setValue(key: string, value: string) {

    // change value in designpage
    this.design?.widgets.forEach((widget: DesignPosition) => {
      if (widget.id == this.selectedGridsterItem?.id) {
        if (key === "value") {
          widget.element.values[0].value = value
          this.value = value
        }
        else if (key === "text") {
          widget.element.text = value
          this.text = value
        }
      }
    })

    // subscript to this.deisgnpage
    if (this.design != null)
      this.outputData.updateData(this.design)
  }

  //textarea input
  updateData(event: any, key: string) {
    console.log("new value " + event.target.value);

    this.setValue(key, event.target.value)
  }


  /**
   * card setting display
   * @returns settings card of selected widget and delete button
   */
  showCardView(): boolean { return this.type === 0 }
  showGraphView(): boolean { return this.type === 1 }
  showButtonView(): boolean { return this.type === 2 }
  showChartView(): boolean { return this.type === 3 }

  showDeleteButton(): boolean {
    if (this.type != null) {
      return this.type >= 0 || this.type <= 4
    }
    else
      return false
  }

  //open delete dialog
  openDeleteDialog() {
    const data = {
      title: this.delete_title,
      descriptionHtml:
        'Are you sure you want to delete this <b>' + this.delete_component + '</b>?<br /><br />' +
        'Deleting this component is a <b>destructive</b> action, meaning that it cannot be reverted later.',
      alignActions: 'start',
      cancelText: 'CANCEL',
      successText: 'DELETE ' + this.delete_component.toUpperCase(),
      selectedWidget: this.selectedWidget
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") {
        console.log(result)
        this.deletionService.sendEvent(data.selectedWidget)
      }
    });
  }
}



