import { AssetType } from 'src/app/core/models/asset-type';
import { Injectable } from '@angular/core';
import openremote, {Auth} from "@openremote/core/dist";
import {HttpClient} from "@angular/common/http";
import {OrUserresponse} from "../models/or-userresponse";
import {AssetQueryAccess} from "@openremote/model";
import { isThisQuarter } from 'date-fns';
@Injectable({
  providedIn: 'root'
})
export class OpenremoteService {

  private usedAssetTypes : Array<any> | any;
  private assetTypes : Array<any> | any;
  private usedAssets : Array<any> | any;

  constructor(private httpClient: HttpClient) {

    this.usedAssetTypes = [];
    this.assetTypes = [];
    this.usedAssets = [];

    openremote.init({
      managerUrl: "http://martinaeytesting.nl:8080",
      keycloakUrl: "http://martinaeytesting.nl:8080/auth",
      auth: Auth.KEYCLOAK,
      autoLogin: true,
      credentials: {
        username: "admin",
        password: "secret",
      },
      loadDescriptors: false,
      realm: "master",
      loadIcons: true,
      configureTranslationsOptions: (options) => {
        options.lng = "nl"; // Change initial language to dutch rather than english
      }
    }).then((success) => {
      if (success) {
        console.log("Connection to OpenRemote server was a success!");

        // Getting the list of all asset types
        httpClient.get('/api/master/model/assetDescriptors').subscribe(result => {
          this.assetTypes = result;
          console.log('DESCRIPTORS', this.assetTypes);
        })

        //Getting the currently logged on User:
        httpClient.get('/api/master/user/user').subscribe(result => {
          console.log("Logged into OpenRemote Servers with the following user:");
          console.log(result);
          const userResponse = result as OrUserresponse;

          // Getting a list of assets depending on the query filter.
          openremote.rest.api.AssetResource.queryAssets({}).then(result => {

            // Debug
            console.log('Data', result.data);
            console.log("OpenRemote REST API queryAssets() returned the following:");
            console.log(result);

              // Filtering the list of components to get a list of unique asset types
                result.data.forEach(element => {
                  this.usedAssets.push(element);
                  let assetType = element.type;
                if (assetType){
                  this.assetTypes.forEach((type : any) => {
                    if (type.name == assetType){
                      if (!this.usedAssetTypes.includes(type)){
                        this.usedAssetTypes.push(type);
                      }
                    }
                  });
                }
            });

            //this.usedAssets = result.data;
            console.log('usedassets', this.usedAssets);

          }).catch(error => {
            console.log("OpenRemote REST API request returned an error!");
            console.error(error.message);
          });

          // Subscribing to AssetEvents, so when an asset gets added or updated on the OpenRemote platform, we show a quick console log
          // This is just an example, probably not used in our end product.
          /*openremote.getEventProvider()?.subscribeAssetEvents(null, true, (assetEvent) => {
            console.log("Got a WS message from OpenRemote AssetEvents:");
            console.log(assetEvent);
          })*/
        })

      } else {
        console.log("Connection to OpenRemote server failed..");
        // Something has gone wrong
      }
    });
  }

/**
 * Function to get all the currently used assets
 * @returns {Array} An array containing all the assets used in the current manager platoform realm
 */
  public  getAssets() : Array<any> {
    console.log("Returning", this.usedAssets);
    return this.usedAssets;
  }

  /**
   * Function for returning the list of currently used asset types
   * @returns {Array<string>} List of asset types
   */
  public getAssetTypes() : Array<any> {
      console.log("Returning", this.usedAssetTypes);
      return this.usedAssetTypes;
  }
}
