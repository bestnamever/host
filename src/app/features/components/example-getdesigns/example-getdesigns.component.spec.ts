import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGetdesignsComponent } from './example-getdesigns.component';

describe('ExampleGetdesignsComponent', () => {
  let component: ExampleGetdesignsComponent;
  let fixture: ComponentFixture<ExampleGetdesignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleGetdesignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleGetdesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
