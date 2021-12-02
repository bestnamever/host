import { TestBed } from '@angular/core/testing';

import { OpenremoterequestInterceptor } from './openremoterequest.interceptor';

describe('OpenremoterequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OpenremoterequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OpenremoterequestInterceptor = TestBed.inject(OpenremoterequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
