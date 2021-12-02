import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTopbarComponent } from './preview-topbar.component';

describe('PreviewTopbarComponent', () => {
  let component: PreviewTopbarComponent;
  let fixture: ComponentFixture<PreviewTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewTopbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
