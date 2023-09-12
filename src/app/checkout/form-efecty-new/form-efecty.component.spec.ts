import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEfectyNewComponent } from './form-efecty.component';

describe('FormEfectyComponent', () => {
  let component: FormEfectyNewComponent;
  let fixture: ComponentFixture<FormEfectyNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEfectyNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEfectyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
