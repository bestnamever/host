import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComfirmComponent } from './delete-comfirm.component';

describe('DeleteComfirmComponent', () => {
  let component: DeleteComfirmComponent;
  let fixture: ComponentFixture<DeleteComfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteComfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
