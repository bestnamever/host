import {GridsterItem} from 'angular-gridster2';
import {DesignElement} from "./design-element";

export interface WidgetComponent {
  gridsterItem: GridsterItem;
  widgetData: DesignElement;
}
