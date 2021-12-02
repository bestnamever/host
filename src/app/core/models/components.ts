import { AssetType } from "./asset-type";
import { WidgetType } from "./widget-type";

export interface Components {
    componentTitle: string,
    iconCode: string,
    componentType: WidgetType,
    compatibleAssetTypes: AssetType[],
    isdragging: Boolean
}