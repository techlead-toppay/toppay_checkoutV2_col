import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPseComponent } from './form-pse.component';

describe('FormPseComponent', () => {
  let component: FormPseComponent;
  let fixture: ComponentFixture<FormPseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
