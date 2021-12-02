import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchboxValue : string; // Input value

  constructor() {
    this.searchboxValue = '';
  }

  ngOnInit() {
  }

  @Output() searchUpdateEvent = new EventEmitter<string>(); // Setup an eventemitter to send data outside component

  /**
   * Function that updates the searchbox value to the value in the html element
   * @param {Event} e The event for changing the input value
   */
  updateValue(e: Event) : void {
    this.searchboxValue = (e.target) ? (<HTMLTextAreaElement>e.target).value : '';
    this.searchUpdateEvent.emit((e.target) ? (<HTMLTextAreaElement>e.target).value : '');
  }
  
  /**
   * Funcition that sets the searchbox's value whenever the form is submitted
   * @param {Event} e The sumbit event of the form
   */
  readValue(e : Event) : void {
    e.preventDefault();
    this.searchboxValue = (e.target) ? (<HTMLTextAreaElement>e.target).value : ''
  }

}
