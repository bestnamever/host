import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRightbarComponentsComponent } from './layout-rightbar-components.component';

describe('LayoutRighebarComponentsComponent', () => {
  let component: LayoutRightbarComponentsComponent;
  let fixture: ComponentFixture<LayoutRightbarComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutRightbarComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRightbarComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
