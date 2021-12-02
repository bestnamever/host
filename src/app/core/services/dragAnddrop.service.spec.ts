import { TestBed } from '@angular/core/testing';

import { DragAndDropService } from './dragAnddrop.service';

describe('Drag&DropService', () => {
  let service: DragAndDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragAndDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
