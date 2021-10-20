import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-thumbnail',
  templateUrl: './component-thumbnail.component.html',
  styleUrls: ['./component-thumbnail.component.scss']
})
export class ComponentThumbnailComponent implements OnInit {

  @Input() componentTitle : any;
  @Input() iconCode : any;

  constructor() { }

  ngOnInit() {
  }

}
