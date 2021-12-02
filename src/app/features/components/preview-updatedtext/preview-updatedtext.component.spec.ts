import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUpdatedtextComponent } from './preview-updatedtext.component';

describe('PreviewUpdatedtextComponent', () => {
  let component: PreviewUpdatedtextComponent;
  let fixture: ComponentFixture<PreviewUpdatedtextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewUpdatedtextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewUpdatedtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
