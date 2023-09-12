import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionTransactionComponent } from './completion-transaction.component';

describe('CompletionTransactionComponent', () => {
  let component: CompletionTransactionComponent;
  let fixture: ComponentFixture<CompletionTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletionTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
