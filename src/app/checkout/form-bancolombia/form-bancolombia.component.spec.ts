import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBancolombiaComponent } from './form-bancolombia.component';

describe('FormBancolombiaComponent', () => {
  let component: FormBancolombiaComponent;
  let fixture: ComponentFixture<FormBancolombiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBancolombiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBancolombiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
