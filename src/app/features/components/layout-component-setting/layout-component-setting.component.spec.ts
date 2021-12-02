import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponentSettingComponent } from './layout-component-setting.component';

describe('LayoutComponentSettingComponent', () => {
  let component: LayoutComponentSettingComponent;
  let fixture: ComponentFixture<LayoutComponentSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutComponentSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
