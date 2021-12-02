import { WidgetType } from "./widget-type";
import { AssetType } from "./asset-type";
import { DesignElementvalue } from "./design-elementvalue";

export interface DesignElement {
  widgetType: WidgetType;
  assetType: AssetType;
  text: string;
  values: Array<DesignElementvalue>;
  details?: Map<string, string>;
}
