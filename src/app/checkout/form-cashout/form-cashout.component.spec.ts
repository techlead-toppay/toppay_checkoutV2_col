import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCashoutComponent } from './form-cashout.component';

describe('FormCashoutComponent', () => {
  let component: FormCashoutComponent;
  let fixture: ComponentFixture<FormCashoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCashoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCashoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
