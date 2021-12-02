import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponentInterface } from "angular-gridster2";
import { WidgetComponent } from "../../../core/models/widget-component";
import { PhoneProperties } from "../../../core/models/phone-properties";
import { PreviewService } from "../../../core/services/preview.service";
import { DesignPage } from "../../../core/models/design-page";
import { DesignService } from "../../../core/services/design.service";
import { PhoneService } from "../../../core/services/phone.service";
import { DesignElement } from 'src/app/core/models/design-element';
import { WidgetType } from 'src/app/core/models/widget-type';
import { AssetType } from 'src/app/core/models/asset-type';
import { DragAndDropService } from 'src/app/core/services/dragAnddrop.service';
import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
import { empty, Subscription } from 'rxjs';
import { DesignPosition } from 'src/app/core/models/design-position';
import { DeletionService } from 'src/app/core/services/deletion.service';
import { PhoneDirection } from "../../../core/models/phone-direction";
import { el } from 'date-fns/locale';
import { ConsoleConfigurationValidationFailureReason } from '@openremote/model';


@Component({
  selector: 'app-preview-grid',
  templateUrl: './preview-grid.component.html',
  styleUrls: ['./preview-grid.component.scss']
})
export class PreviewGridComponent implements OnInit {

  // Input
  @Input('fullscreen') fullscreen: boolean | undefined;
  @Input('editMode') editMode: boolean | undefined;

  // Variables
  gridOptions: GridsterConfig;
  phoneOptions: PhoneProperties | undefined;
  phoneOrientation: PhoneDirection | undefined;
  dashboardComponents: Array<WidgetComponent>;

  currentDesignPage: DesignPage | null;
  selectedWidget: WidgetComponent | null;
  isDragging: boolean | null;

  dragEventSubscription: Subscription

  deletionEventSubscription: Subscription

  gridItemCoordinates: Map<GridsterItemComponentInterface, { x: number, y: number, width: number, height: number }>;
  //selected type
  // message: string;
  // subscription: Subscription;

  /* ---------------------------------------------------------- */

  // Constructor
  constructor(private previewService: PreviewService, private designService: DesignService, private phoneService: PhoneService, private dragDropService: DragAndDropService, private deletionService: DeletionService, private changeDetectorRef: ChangeDetectorRef) {
    this.selectedWidget = null;
    this.currentDesignPage = null;
    this.isDragging = false;
    this.dashboardComponents = new Array<WidgetComponent>();

    this.gridItemCoordinates = new Map<GridsterItemComponentInterface, { x: number, y: number, width: number, height: number }>();

    this.gridOptions = {
      isMobile: true,
      mobileBreakpoint: 1,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      },
      pushItems: true,
      margin: 12,
      outerMargin: true,
      outerMarginTop: 36,
      outerMarginBottom: 18,
      outerMarginLeft: 18,
      outerMarginRight: 18,
      minCols: 2,
      maxCols: 2,
      minRows: 2,
      maxRows: 100,
      gridType: 'scrollVertical',
      pushResizeItems: true,
      disableScrollHorizontal: true,
      displayGrid: 'onDrag&Resize',
      itemInitCallback: (item, itemComponent) => { this.itemChange(item, itemComponent); },
      itemChangeCallback: (item, itemComponent) => { this.itemChange(item, itemComponent); },
      // itemResizeCallback: PreviewGridComponent.itemResize,
    };

    this.dragEventSubscription = this.dragDropService.getEvent().subscribe(param => {
      this.addItem(param.type, param.x, param.y)
    })

    this.deletionEventSubscription = this.deletionService.getEvent().subscribe(data => {
      this.removeItem(data)
    })

    this.dragDropService.isOptionShownState.subscribe(isShown => {
      if (isShown) {
        this.gridOptions.displayGrid = 'always'
        this.changedOptions()
      }
      else {
        this.gridOptions.displayGrid = 'onDrag&Resize'
        this.changedOptions()
      }
    });



    //subscribe to type of selected widght

    // this.message = ""
    // this.subscription = this.data.currentMessage.subscribe((message: string) => this.message = message)
  }


  /* ------------------------------------------------------- */

  // Method called on init of the page
  ngOnInit(): void {

    // Apply phone options
    this.phoneService.currentPhoneState.subscribe(phone => {
      this.phoneOptions = phone;
      if (this.gridOptions.api && this.gridOptions.api.resize) {
        this.gridOptions.api.resize();
      }
    });

    this.phoneService.currentOrientationState.subscribe(orientation => {
      this.phoneOrientation = orientation;
      if (this.gridOptions.api && this.gridOptions.api.resize) {
        this.gridOptions.api.resize();
      }
    })

    this.dragDropService.isOptionShownState.subscribe(data => {
      this.isDragging = data;
    })

    this.gridOptions.draggable = {
      enabled: this.editMode
    };
    this.gridOptions.resizable = {
      enabled: this.editMode
    }
    this.changedOptions();


    // Subscribe to changes of the Design
    this.designService.currentDesignState.subscribe(design => {
      var ids = new Array<number>()
      var deletedComponentId!: any
      console.log('Starting to render the design..');
      console.log(design)

      this.currentDesignPage = design;
      if (design != null) {
        design.positions.forEach(position => {
          const item = {
            gridsterItem: {
              id: position.id,
              cols: position.width,
              rows: position.height,
              x: position.positionX,
              y: position.positionY
            },
            widgetData: position.element
          };

          ids.push(position.id)

          // Check if the component is already added with the same properties (width, height, x, y, etc)
          if (this.dashboardComponents.filter(x => { return x.gridsterItem.id == item.gridsterItem.id }).length == 0) {
            this.dashboardComponents.push(item);
          }
        });

        // get the component's id which is not inside of the design
        this.dashboardComponents.forEach(component => {
          if (!ids.includes(component.gridsterItem.id))
            deletedComponentId = component.gridsterItem.id
        })

        var temp = this.dashboardComponents
        var temp2 = temp.filter(x => {
          return x.gridsterItem.id != deletedComponentId
        })
        console.log("temp2 is " + JSON.stringify(temp2))

        console.log("deleted component is " + JSON.stringify(this.dashboardComponents[deletedComponentId]))
        //this.dashboardComponents.splice(deletedComponentId, 1)  infinite loop
        this.dashboardComponents = temp2
        console.log('Rendering finished!');
        console.log(this.dashboardComponents);
      }

    });

    // Subscribe to the currently selected Widget
    this.previewService.currentlySelectedWidgetState.subscribe(widget => {
      this.selectedWidget = widget;
    });

    this.dragDropService.sendGridItemCoordinates(this.gridItemCoordinates)

  }

  /* ----------------------------------------------- */

  changedOptions(): void {
    if (this.gridOptions.api && this.gridOptions.api.optionsChanged)
      this.gridOptions.api?.optionsChanged()
  }


  itemInit(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {

  }

  itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {

    // Update the design in the storage
    if (this.currentDesignPage != null) {
      this.currentDesignPage.positions.forEach(position => {
        if (position.id == item.id) {
          console.log('An item with the id [' + position.id + '] changed!');
          position.positionX = item.x;
          position.positionY = item.y;
          position.width = item.cols;
          position.height = item.rows;
          if (this.currentDesignPage != null) {
            this.designService.updateLocation(this.currentDesignPage);
          } else {
            console.error("Could not update the Design! CurrentDesignPage state does not exist!");
          }
        }
      })
    }

    console.log('itemChanged', item, itemComponent);
    // const itemComponent = this.gridOptions.api.getItemComponent(item);
    const domRect = itemComponent.el.getBoundingClientRect();
    const clientX = domRect.left;
    const clientY = domRect.top;
    const width = domRect.width;
    const height = domRect.height;
    this.gridItemCoordinates.set(itemComponent, { x: clientX, y: clientY, width, height });
    console.log(this.gridItemCoordinates);
  }

  /* --------------------------------------- */


  selectItem(component: WidgetComponent): void {
    this.previewService.selectWidget(component);
    // console.log(this.previewService.currentlySelectedWidgetState)
  }

  getAspectRatio(): any {
    if (this.phoneOrientation == PhoneDirection.PORTRAIT) {
      return this.phoneOptions?.aspectRatio;
    } else {
      let aspectRatio = this.phoneOptions?.aspectRatio;
      const splittedRatio = aspectRatio?.split('/');
      // console.log(splittedRatio);
      if (splittedRatio != null) {
        aspectRatio = splittedRatio[1] + "/" + splittedRatio[0];
      }
      // console.log("Aspect Ratio is now [" + aspectRatio + "]");
      return aspectRatio;
    }
    return undefined;
  }

  getPreviewHeight(): any {
    if (this.phoneOptions?.phoneType == undefined) {
      const splittedRatio = this.phoneOptions?.aspectRatio.split("/");
      if (splittedRatio != null) {
        if (Number.parseInt(splittedRatio[0]) > Number.parseInt(splittedRatio[1])) {
          return undefined; // Width is higher, so LANDSCAPE mode
        } else {
          if (this.phoneOptions?.customHeight != null) {
            return this.phoneOptions.customHeight;
          }
          return '80%'; // Height is higher, so PORTRAIT mode
        }
      }
    } else {
      if (this.phoneOrientation == PhoneDirection.PORTRAIT) {
        if (this.phoneOptions?.customHeight != null) {
          return this.phoneOptions.customHeight;
        }
        return '80%';
      }
    }
    return undefined;
  }
  getPreviewWidth(): any {
    if (this.phoneOptions?.phoneType == undefined) {
      const splittedRatio = this.phoneOptions?.aspectRatio.split("/");
      if (splittedRatio != null) {
        if (Number.parseInt(splittedRatio[0]) > Number.parseInt(splittedRatio[1])) {
          if (this.phoneOptions?.customWidth != null) {
            return this.phoneOptions.customWidth;
          }
          return '70%'; // Width is higher, so LANDSCAPE mode
        } else {
          return undefined; // Height is higher, so PORTRAIT mode
        }
      }
    } else {
      if (this.phoneOrientation == PhoneDirection.PORTRAIT) {
        return undefined;
      } else {
        if (this.phoneOptions?.customWidth != null) {
          return this.phoneOptions.customWidth;
        }
        return '70%';
      }
    }
  }


  getMarginTop(): string | undefined {
    if (this.phoneOrientation == PhoneDirection.PORTRAIT) { return this.phoneOptions?.marginTop; }
    else { return undefined; }
  }
  getMarginBottom(): string | undefined {
    if (this.phoneOrientation == PhoneDirection.PORTRAIT) { return this.phoneOptions?.marginBottom }
    else { return undefined; }
  }
  getMarginLeft(): string | undefined {
    if (this.phoneOrientation == PhoneDirection.LANDSCAPE) { return this.phoneOptions?.marginTop; }
    else { return undefined; }
  }
  getMarginRight(): string | undefined {
    if (this.phoneOrientation == PhoneDirection.LANDSCAPE) { return this.phoneOptions?.marginBottom; }
    else { return undefined; }
  }

  getBorderState(component: WidgetComponent): any {
    if (this.isWidgetSelected(component) && this.editMode) {
      return 'inset 0px 0px 0px 2px #4D9D2A';
    } else {
      return 'inset 0px 0px 0px 2px #E0E0E0';
    }
  }



  isWidgetSelected(component: WidgetComponent): any {
    return this.selectedWidget === component;
  }

  //generate gristerItem's widget data
  generateWidgetData(type: WidgetType): DesignElement {

    let newDesignElement: DesignElement
    let text: string

    switch (type) {
      case WidgetType.LABEL:
        text = "Label"
        break;
      case WidgetType.GRAPH:
        text = "Graph"
        break;
      case WidgetType.BUTTON:
        text = "Button"
        break;
      case WidgetType.BARCHART:
        text = "Barchart"
        break;
      case WidgetType.PIECHART:
        text = "Piechart"
        break;
      case WidgetType.CARD:
        text = "Card"
        break;
      default:
        text = "Label"
        break
    }
    //value of new element should be pre-seted
    newDesignElement = {
      widgetType: type,
      assetType: AssetType.THERMOSTAT,
      text: "Label for " + text,
      values: [{
        asset: "Thermostat 1",
        time: new Date("2019-01-16"),
        value: "25",
        measurement: "°C"
      }]
    }
    return newDesignElement
  }

  /**
   * add an item into preivew
   */
  public addItem(value: WidgetType, x: number, y: number) {
    if (this.currentDesignPage?.positions.length != 0) {
      console.log("something")
      var maxCurrentId = this.currentDesignPage?.positions[this.currentDesignPage.positions.length - 1].id
      if (maxCurrentId != null) {
        const designpostion: DesignPosition = {
          id: maxCurrentId + 1,
          positionX: x,
          positionY: y,
          width: 1,
          height: 1,
          element: this.generateWidgetData(value)
        }
        // this.dashboardComponents.push({
        //   gridsterItem: { cols: 1, rows: 1, x, y, minItemCols: 1, minItemRows: 1 },
        //   widgetData: this.generateWidgetData(value)
        // })
        if (this.currentDesignPage != null) {
          this.currentDesignPage?.positions.push(designpostion)
          this.designService.updateData(this.currentDesignPage)
        }
      }
    }
    else {
      console.log("empty")
      const designpostion: DesignPosition = {
        id: 1,
        positionX: x,
        positionY: y,
        width: 1,
        height: 1,
        element: this.generateWidgetData(value)
      }
      if (this.currentDesignPage != null) {
        this.currentDesignPage?.positions.push(designpostion)
        this.designService.updateData(this.currentDesignPage)
      }
    }
  }

  public removeItem(widget: WidgetComponent) {
    if (this.currentDesignPage != null) {
      console.log("current design page is " + JSON.stringify(this.currentDesignPage))
      this.currentDesignPage.positions = this.currentDesignPage.positions.filter(obj => JSON.stringify(obj.id) !== JSON.stringify(widget.gridsterItem.id))
      console.log(this.currentDesignPage)
      this.designService.updateData(this.currentDesignPage)
    }
  }

  /**
   * drag and drop
   * entered
   */
  enter(event: CdkDragEnter<any>) {
    console.log('entered');
  }

  // onDrop(event: CdkDragDrop<WidgetComponent[]>) {
  //   this.dragDropService.drop(event);
  // }

  //hotkey for deletion
  deletion() {
    console.log("key pressed")
  }
}
