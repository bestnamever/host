import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRightbarComponent } from './layout-rightbar.component';

describe('LayoutRightbarComponent', () => {
  let component: LayoutRightbarComponent;
  let fixture: ComponentFixture<LayoutRightbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutRightbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
