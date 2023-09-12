import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDaviplataComponent } from './info-daviplata.component';

describe('InfoDaviplataComponent', () => {
  let component: InfoDaviplataComponent;
  let fixture: ComponentFixture<InfoDaviplataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDaviplataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDaviplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
