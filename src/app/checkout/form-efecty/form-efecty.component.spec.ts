import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEfectyComponent } from './form-efecty.component';

describe('FormEfectyComponent', () => {
  let component: FormEfectyComponent;
  let fixture: ComponentFixture<FormEfectyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEfectyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEfectyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
