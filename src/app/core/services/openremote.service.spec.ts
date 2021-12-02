import { TestBed } from '@angular/core/testing';

import { OpenremoteService } from './openremote.service';

describe('OpenremoteService', () => {
  let service: OpenremoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenremoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
