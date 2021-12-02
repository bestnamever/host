/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AttributePickerControlService } from './attributePickerControl.service';

describe('Service: AttributePickerControl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributePickerControlService]
    });
  });

  it('should ...', inject([AttributePickerControlService], (service: AttributePickerControlService) => {
    expect(service).toBeTruthy();
  }));
});
