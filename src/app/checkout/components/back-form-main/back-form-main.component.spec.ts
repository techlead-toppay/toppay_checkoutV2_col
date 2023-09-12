import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFormMainComponent } from './back-form-main.component';

describe('BackFormMainComponent', () => {
  let component: BackFormMainComponent;
  let fixture: ComponentFixture<BackFormMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackFormMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackFormMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
