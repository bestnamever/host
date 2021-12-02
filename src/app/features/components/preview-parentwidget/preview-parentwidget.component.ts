import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {WidgetType} from "../../../core/models/widget-type";
import {DesignElement} from "../../../core/models/design-element";
import {DesignService} from "../../../core/services/design.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-preview-parentwidget',
  templateUrl: './preview-parentwidget.component.html',
  styleUrls: ['./preview-parentwidget.component.scss']
})
export class PreviewParentwidgetComponent implements OnInit, AfterViewInit, OnDestroy {

  // Variables
  @Input('widgetId') widgetId: number | undefined;
  // @Input('widgetData') widgetData: DesignElement | undefined;
  widgetData: DesignElement | undefined;
  amountOfTimesUpdated: number;

  @ViewChild("container", {read: ViewContainerRef, static: false}) containerRef: ViewContainerRef | undefined;
  @ViewChild("content", {read: TemplateRef, static: false}) contentRef: TemplateRef<any> | undefined;

  private currentDesignSub: Subscription | undefined;

  // Constructor
  constructor(private designService: DesignService, private changeDetectorRef: ChangeDetectorRef) {
    this.amountOfTimesUpdated = 0;
  }

  ngOnInit(): void {
    console.log('Rendering PreviewParentWidget with the following data:');

    // Subscribe to changes of the Design
    this.currentDesignSub = this.designService.currentDesignState.subscribe(design => {
      const oldDesign = this.designService.getHistoryByNumber(1);
      let oldWidgetData = null;
      if(oldDesign != null) { oldWidgetData = oldDesign.positions.find(x => { return x.id == this.widgetId})?.element; }
      const newWidgetData = design.positions.find(x => { return x.id == this.widgetId})?.element;
      if(this.amountOfTimesUpdated == 0 || JSON.stringify(newWidgetData) !== JSON.stringify(oldWidgetData)) {
        console.log("Updating the ParentWidget...");
        this.amountOfTimesUpdated++;
        this.widgetData = newWidgetData;
        console.log(this.widgetData);
        if(this.containerRef != null && this.contentRef != null) {
          this.containerRef.clear();
          this.containerRef.createEmbeddedView(this.contentRef);
        }
      }
    });
  }

  ngAfterViewInit() {
    if(this.containerRef != null && this.contentRef != null) {
      this.containerRef.createEmbeddedView(this.contentRef);
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if(this.currentDesignSub != null) { this.currentDesignSub.unsubscribe(); }
  }

  /* -------------------------------- */

  // ngIf methods
  isLabel(): boolean { return this.widgetData?.widgetType === WidgetType.LABEL; }
  isGraph(): boolean { return this.widgetData?.widgetType === WidgetType.GRAPH; }
  isBarChart(): boolean { return this.widgetData?.widgetType === WidgetType.BARCHART }

}
