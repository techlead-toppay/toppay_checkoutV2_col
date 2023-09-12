import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNequiComponent } from './info-nequi.component';

describe('InfoNequiComponent', () => {
  let component: InfoNequiComponent;
  let fixture: ComponentFixture<InfoNequiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoNequiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoNequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
