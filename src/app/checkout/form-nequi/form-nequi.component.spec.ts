import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNequiComponent } from './form-nequi.component';

describe('FormNequiComponent', () => {
  let component: FormNequiComponent;
  let fixture: ComponentFixture<FormNequiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNequiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
