import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WidgetComponent } from '../models/widget-component';

@Injectable({
  providedIn: 'root'
})
export class DeletionService {

  private subject: Subject<any>;

  constructor() {
    this.subject = new Subject<any>()
  }

  /* ---------------------------------------------- */

  // Methods
  sendEvent(widget: WidgetComponent | null) {
    this.subject.next(widget)
  }

  getEvent(): Observable<any> {
    return this.subject.asObservable()
  }
}
