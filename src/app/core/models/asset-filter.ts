import { WidgetType } from './widget-type';
import { AssetType } from 'src/app/core/models/asset-type';

export interface AssetFilter{
    assetType : AssetType | boolean
    enabledComponents : Array<WidgetType> | boolean
}