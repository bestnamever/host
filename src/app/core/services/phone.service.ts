import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { PhoneProperties } from "../models/phone-properties";
import { PhoneType } from "../models/phone-type";

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  // Variables
  private currentPhoneSubject: BehaviorSubject<PhoneProperties>; // The state which we can edit
  public currentPhoneState: Observable<PhoneProperties>; // The view-only state, where we can subscribe on to get updates.

  // Constructor
  constructor() {

    // Initialize variables
    this.currentPhoneSubject = new BehaviorSubject<PhoneProperties>(this.getDefaultPhone()); // Set the value on init
    this.currentPhoneState = this.currentPhoneSubject.asObservable(); // Make a clone of the state which is read-only

    // A method that sends a message to console when the Design gets updated
    if (environment.useLocalStorage) {
      this.currentPhoneState.subscribe((phone) => {
        localStorage.setItem('savedPhone', JSON.stringify(phone))
      });
    }
  }

  /* ---------------------------------------------- */

  // Methods
  changePhone(phoneType: PhoneType): void {
    switch (phoneType) {

      case PhoneType.SAMSUNG_S20: {
        this.currentPhoneSubject.next({
          phoneType: PhoneType.SAMSUNG_S20,
          borderThickness: '4px',
          borderRadius: '30px',
          notch: true,
          notchRadius: '4px',
          aspectRatio: '9/17.5'
        });
        break;
      }
      case PhoneType.SAMSUNG_S10: {
        this.currentPhoneSubject.next({
          phoneType: PhoneType.SAMSUNG_S10,
          borderThickness: '4px',
          borderRadius: '30px',
          notch: true,
          notchRadius: '4px',
          aspectRatio: '9/17.5'
        });
        break;
      }
    }
  }


  /* ---------------------------------------------------------- */

  // Setting the default Phone
  getDefaultPhone(): any {
    const savedPhone = localStorage.getItem('savedPhone');
    if (environment.useLocalStorage && savedPhone != null) {
      console.log('Got the phone from local Storage!');
      console.log(savedPhone);
      return JSON.parse(savedPhone) as PhoneProperties;
    } else {
      return {
        phoneType: PhoneType.SAMSUNG_S20,
        borderThickness: '4px',
        borderRadius: '30px',
        notch: true,
        notchRadius: '4px',
        aspectRatio: '9/17.5'
      } as PhoneProperties;
    }
  }
}
