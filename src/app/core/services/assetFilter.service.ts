import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { AssetType } from '../models/asset-type';
import { WidgetType } from '../models/widget-type';
import { AssetFilter } from '../models/asset-filter';

@Injectable({
  providedIn: 'root'
})
export class AssetFilterService {

  private currentAssetFilterSubject: BehaviorSubject<AssetFilter>; // The state which we can edit
  public currentAssetFilterState: Observable<AssetFilter>; // The view-only state, where we can subscribe on to get updates.

  constructor() {
    this.currentAssetFilterSubject = new BehaviorSubject<AssetFilter>(this.getDefaultFilter());
    this.currentAssetFilterState = this.currentAssetFilterSubject.asObservable();
  }


  // -- Methods --
  getComponents(assetTypeValue: string): void {
    console.log(`Hey i'm working, the asset type was ${assetTypeValue}`);
  }

  getDefaultFilter(): AssetFilter {
    return {
      assetType: false,
      enabledComponents: true
    }
  }
}




