import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDaviplataComponent } from './form-daviplata.component';

describe('FormDaviplataComponent', () => {
  let component: FormDaviplataComponent;
  let fixture: ComponentFixture<FormDaviplataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDaviplataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDaviplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
