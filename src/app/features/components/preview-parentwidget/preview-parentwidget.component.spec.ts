import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewParentwidgetComponent } from './preview-parentwidget.component';

describe('PreviewParentwidgetComponent', () => {
  let component: PreviewParentwidgetComponent;
  let fixture: ComponentFixture<PreviewParentwidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewParentwidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewParentwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
