import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import {PhoneProperties} from "../models/phone-properties";
import {PhoneType} from "../models/phone-type";
import {PhoneDirection} from "../models/phone-direction";

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  // Variables
  private currentPhoneSubject: BehaviorSubject<PhoneProperties>; // The state which we can edit
  public currentPhoneState: Observable<PhoneProperties>; // The view-only state, where we can subscribe on to get updates.
  private currentOrientationSubject: BehaviorSubject<PhoneDirection>;
  public currentOrientationState: Observable<PhoneDirection>;

  // Constructor
  constructor() {

    // Initialize variables
    this.currentPhoneSubject = new BehaviorSubject<PhoneProperties>(this.getDefaultPhone()); // Set the value on init
    this.currentPhoneState = this.currentPhoneSubject.asObservable(); // Make a clone of the state which is read-only

    this.currentOrientationSubject = new BehaviorSubject<PhoneDirection>(this.getDefaultOrientation());
    this.currentOrientationState = this.currentOrientationSubject.asObservable();

    // A method that sends a message to console when the Design gets updated
    if (environment.useLocalStorage) {
      this.currentPhoneState.subscribe((phone) => {
        localStorage.setItem('savedPhone', JSON.stringify(phone))
      });
    }
  }

  /* ---------------------------------------------- */

  // Methods
  changeOrientation(phoneOrientation: PhoneDirection) {
    console.log("Switching Phone Orientation to " + PhoneDirection[phoneOrientation] + "..")
    this.currentOrientationSubject.next(phoneOrientation);
  }

  changePhone(phoneType?: PhoneType, customWidth?: number, customHeight?: number): void {
    let properties;
    if(customWidth != null && customHeight != null) {
      properties = this.getPhone(undefined, customWidth, customHeight)
    } else if(phoneType != null) {
      properties = this.getPhone(phoneType);
    }
    if(properties != null) {
      this.currentPhoneSubject.next(properties);
    }
  }

  getPhone(phoneType?: PhoneType, customWidth?: number, customHeight?: number): PhoneProperties | undefined {
    if(customWidth != null && customHeight != null) {
      return {
        borderThickness: '6px',
        borderRadius: '12px',
        smallNotch: false,
        largeNotch: false,
        aspectRatio: customWidth + '/' + customHeight,
        customWidth: '75%',
        customHeight: '75%'
      }
    } else if(phoneType != null) {
      switch (phoneType) {
        case PhoneType["Apple IPhone SE 2020"]: {
          return {
            phoneType: PhoneType["Apple IPhone SE 2020"],
            borderThickness: '9px',
            borderRadius: '54px',
            smallNotch: false,
            largeNotch: false,
            aspectRatio: '9/17',
            marginTop: '52px',
            marginBottom: '52px',
            customWidth: '55%',
            customHeight: '65%'
          }
        }
        case PhoneType["Apple IPhone 13"]: {
          return {
            phoneType: PhoneType["Apple IPhone 13"],
            borderThickness: '7px',
            borderRadius: '40px',
            smallNotch: false,
            largeNotch: true,
            largeNotchWidth: '120px',
            largeNotchHeight: '22px',
            largeNotchRadius: '0 0 12px 12px',
            aspectRatio: '9/19.5'
          }
        }
        case PhoneType["Apple IPad Pro 12.9"]: {
          return {
            phoneType: PhoneType["Apple IPad Pro 12.9"],
            borderThickness: '9px',
            borderRadius: '24px',
            smallNotch: false,
            largeNotch: false,
            aspectRatio: '3/4'
          };
        }
        case PhoneType["Desktop 16:9"]: {
          return {
            phoneType: PhoneType["Desktop 16:9"],
            borderThickness: '6px',
            borderRadius: '12px',
            smallNotch: false,
            largeNotch: false,
            aspectRatio: '9/16',
            customWidth: '80%',
          }
        }
        case PhoneType["Desktop 16:10"]: {
          return {
            phoneType: PhoneType["Desktop 16:10"],
            borderThickness: '6px',
            borderRadius: '12px',
            smallNotch: false,
            largeNotch: false,
            aspectRatio: '10/16',
            customWidth: '80%',
          }
        }
        case PhoneType["Desktop 21:9"]: {
          return {
            phoneType: PhoneType["Desktop 21:9"],
            borderThickness: '6px',
            borderRadius: '12px',
            smallNotch: false,
            largeNotch: false,
            aspectRatio: '9/21',
            customWidth: '85%',
          }
        }
        case PhoneType["Google Pixel 6"]: {
          return {
            phoneType: PhoneType["Google Pixel 6"],
            borderThickness: '6px',
            borderRadius: '22px',
            smallNotch: true,
            smallNotchRadius: '8px',
            smallNotchWidth: '16px',
            largeNotch: false,
            aspectRatio: '9/19.5'
          }
        }
        case PhoneType["LENOVO Tab M10 Plus"]: {
          return {
            phoneType: PhoneType["LENOVO Tab M10 Plus"],
            borderThickness: '16px',
            borderRadius: '18px',
            smallNotch: false,
            largeNotch: false,
            aspectRatio: '10/16'
          };
        }
        case PhoneType["OnePlus 9"]: {
          return {
            phoneType: PhoneType["OnePlus 9"],
            borderThickness: '6px',
            borderRadius: '26px',
            smallNotch: true,
            smallNotchRadius: '7px',
            smallNotchWidth: '14px',
            smallNotchCustomTopMargin: '9px',
            smallNotchCustomLeftMargin: '14px',
            largeNotch: false,
            aspectRatio: '9/20',
            customPosition: 'start',
          };
        }
        case PhoneType["OnePlus Nord"]: {
          return {
            phoneType: PhoneType["OnePlus Nord"],
            borderThickness: '7px',
            borderRadius: '26px',
            smallNotch: true,
            smallNotchRadius: '7px',
            smallNotchWidth: '14px',
            smallNotchCustomTopMargin: '9px',
            smallNotchCustomLeftMargin: '14px',
            largeNotch: false,
            aspectRatio: '9/20',
            customPosition: 'start',
          };
        }
        case PhoneType["POCO X3"]: {
          return {
            phoneType: PhoneType["POCO X3"],
            borderThickness: '8px',
            borderRadius: '32px',
            smallNotch: true,
            smallNotchRadius: '8px',
            smallNotchWidth: '16px',
            smallNotchCustomTopMargin: '7px',
            largeNotch: false,
            aspectRatio: '9/20',
          };
        }
        case PhoneType["Samsung S20"]: {
          return {
            phoneType: PhoneType["Samsung S20"],
            borderThickness: '6px',
            borderRadius: '30px',
            smallNotch: true,
            smallNotchRadius: '6px',
            smallNotchWidth: '12px',
            largeNotch: false,
            aspectRatio: '9/20'
          };
        }
        case PhoneType["Samsung S21"]: {
          return {
            phoneType: PhoneType["Samsung S21"],
            borderThickness: '5px',
            borderRadius: '30px',
            smallNotch: true,
            smallNotchRadius: '5px',
            smallNotchWidth: '10px',
            largeNotch: false,
            aspectRatio: '9/20'
          };
        }
        case PhoneType["Samsung Galaxy Tab S7 Plus"]: {
          return {
            phoneType: PhoneType["Samsung Galaxy Tab S7 Plus"],
            borderThickness: '14px',
            borderRadius: '14px',
            smallNotch: false,
            largeNotch: false,
            aspectRatio: '10/16'
          };
        }
        case PhoneType["XIAOMI Mi 11"]: {
          return {
            phoneType: PhoneType["XIAOMI Mi 11"],
            borderThickness: '4px',
            borderRadius: '36px',
            smallNotch: true,
            smallNotchRadius: '7px',
            smallNotchWidth: '14px',
            smallNotchCustomTopMargin: '10px',
            smallNotchCustomLeftMargin: '18px',
            largeNotch: false,
            aspectRatio: '9/20',
            customPosition: 'start'
          };
        }
        default:
          return undefined;
      }
    }
    return undefined;
  }


  /* ---------------------------------------------------------- */

  getDefaultOrientation(): PhoneDirection {
    return PhoneDirection.PORTRAIT;
  }
  // Setting the default Phone
  getDefaultPhone(): any {
    const savedPhone = localStorage.getItem('savedPhone');
    if (environment.useLocalStorage && savedPhone != null) {
      console.log('Got the phone from local Storage!');
      console.log(savedPhone);
      return JSON.parse(savedPhone) as PhoneProperties;
    } else {
      return this.getPhone(PhoneType["Apple IPhone 13"]);
    }
  }
}
