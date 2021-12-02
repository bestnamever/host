import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { DesignPage } from "../models/design-page";
import { WidgetType } from "../models/widget-type";
import { AssetType } from "../models/asset-type";
import { environment } from "../../../environments/environment";
import {OpenremoteService} from "./openremote.service";

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  // Variables
  private currentDesignSubject: BehaviorSubject<DesignPage>; // The state which we can edit
  public readonly currentDesignState: Observable<DesignPage>; // The view-only state, where we can subscribe on to get updates.
  private readonly designHistory: DesignPage[] // List of all submitted Designs, to keep track of history (for undo-ing but also for checking whether it has changed)
  public readonly currentAssets : any;

  // Constructor
  constructor(private openremoteService: OpenremoteService) {

    // Initialize variables
    this.currentDesignSubject = new BehaviorSubject<DesignPage>(this.getFirstDesign()); // Set the 1st design on init
    this.currentDesignState = this.currentDesignSubject.asObservable(); // Make a clone of the state which is read-only
    this.designHistory = [];
    this.designHistory.push(this.getFirstDesign());
    this.currentAssets  = openremoteService.getAssets();

    // openremote impl

    // A method that sends a message to console when the Design gets updated
    if (environment.useLocalStorage) {
      this.currentDesignState.subscribe((design) => {
        localStorage.setItem('savedDesign', JSON.stringify(design))
      });
    }
  }

  public getHistoryByNumber(commitsAgo: number): DesignPage {
    console.log("Current state of designHistory is:");
    console.log(this.designHistory);
    return this.designHistory[this.designHistory.length - commitsAgo];
  }
  public getHistoryLength(): number {
    return this.designHistory.length;
  }

  /* ----------------------------------------- */

  public updateLocation(designPage: DesignPage): any {
    console.log("Started updating the location in DesignService...");
    const newDesignPage = JSON.stringify(designPage); // Duplicating the variable so it does not update here when frontend changes.
    this.currentDesignSubject.next(JSON.parse(newDesignPage));
    this.designHistory.push(JSON.parse(newDesignPage));
    console.log("Updated the location! New history is the following:");
    console.log(this.designHistory);
  }
  public updateData(value: DesignPage): any {
    console.log("Started updating the data in DesignService...");
    const newDesignPage = JSON.stringify(value); // Duplicating the variable so it does not update here when frontend changes.
    this.currentDesignSubject.next(JSON.parse(newDesignPage));
    this.designHistory.push(JSON.parse(newDesignPage));
    console.log("Updated the data! New history is the following:");
    console.log(this.designHistory);
  }

  /* ----------------------------------------- */

  private getFirstDesign(): DesignPage {
    const savedDesign = localStorage.getItem('savedDesign');
    if (environment.useLocalStorage && savedDesign != null) {
      console.log('Got the design from local Storage!');
/*      console.log(savedDesign);*/
      return JSON.parse(savedDesign) as DesignPage;
    } else {
      return {
        name: "Temporary Page",
        positions: [
          {
            id: 0,
            positionX: 0,
            positionY: 0,
            width: 1,
            height: 1,
            element: {
              widgetType: WidgetType.LABEL,
              assetType: AssetType.THERMOSTAT,
              text: "Label for Thermostat",
              values: [{
                asset: "Thermostat 1",
                time: new Date("2019-01-16"),
                value: "25",
                measurement: "°C"
              }]
            }
          },
          {
            id: 1,
            positionX: 0,
            positionY: 1,
            width: 2,
            height: 1,
            element: {
              widgetType: WidgetType.GRAPH,
              assetType: AssetType.SOLAR,
              text: "Solar Energy",
              values: [
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 12)),
                  value: "0.1",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 10)),
                  value: "1.2",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 8)),
                  value: "1.3",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 6)),
                  value: "1.9",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 4)),
                  value: "1.8",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 2)),
                  value: "1.2",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() + (1000 * 60 * 60 * 2)),
                  value: "1.1",
                  measurement: "KW"
                }
              ]
            }
          },
          {
            id: 2,
            positionX: 0,
            positionY: 2,
            width: 2,
            height: 1,
            element: {
              widgetType: WidgetType.BARCHART,
              assetType: AssetType.THERMOSTAT,
              text: "Temperature Bar",
              values: [
                {
                  asset: "Thermostat 1",
                  time: new Date("2019-01-16"),
                  value: "25",
                  measurement: "°C"
                },
                {
                  asset: "Thermostat 2",
                  time: new Date("2019-01-16"),
                  value: "19",
                  measurement: "°C"
                }
              ]
            }
          }
        ]
      }
      //}
    }
  }
}

