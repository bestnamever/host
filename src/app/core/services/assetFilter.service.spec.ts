
import { TestBed, async, inject } from '@angular/core/testing';
import { AssetFilterService } from './assetFilter.service';

describe('Service: AssetFilter', () => {
  let service: AssetFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetFilterService);
  });

  it('should be created',  () => {
    expect(service).toBeTruthy();
  });
});
