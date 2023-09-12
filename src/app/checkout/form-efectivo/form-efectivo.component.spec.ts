import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEfectivoComponent } from './form-efectivo.component';

describe('FormEfectivoComponent', () => {
  let component: FormEfectivoComponent;
  let fixture: ComponentFixture<FormEfectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEfectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEfectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
