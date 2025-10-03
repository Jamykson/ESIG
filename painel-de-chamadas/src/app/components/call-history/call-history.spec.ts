import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallHistory } from './call-history';

describe('CallHistory', () => {
  let component: CallHistory;
  let fixture: ComponentFixture<CallHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
