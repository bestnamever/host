import {Component, OnDestroy, OnInit} from '@angular/core';
import {DesignService} from "../../../core/services/design.service";
import {Design} from "../../../core/models/design";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-example-getdesigns',
  templateUrl: './example-getdesigns.component.html',
  styleUrls: ['./example-getdesigns.component.scss']
})
export class ExampleGetdesignsComponent implements OnInit, OnDestroy {

  // Variables
  private design: Design | undefined;
  private currentDesignSub: Subscription;

  // Constructor
  constructor(private designService: DesignService) {

    // Here we subscribe to the currentDesign, so that we get updates whenever it changes
    this.currentDesignSub = designService.currentDesignState.subscribe(design => {
      console.log('Design updated! Now we can show it on the page!');
      // this.design = design;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.currentDesignSub.unsubscribe();
  }

  /* ---------------------------------------------- */

  // Method to save a new Design in the database. Gets called on Button click.
  save(): void {
    console.log('Saving a new Design...')
    /*this.designService.update({
      id: 0,
      randomField: 'something',
      anotherField: 'something'
    });*/
  }
}
