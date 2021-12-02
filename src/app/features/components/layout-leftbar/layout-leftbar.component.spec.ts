import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLeftbarComponent } from './layout-leftbar.component';

describe('LayoutLeftbarComponent', () => {
  let component: LayoutLeftbarComponent;
  let fixture: ComponentFixture<LayoutLeftbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutLeftbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
