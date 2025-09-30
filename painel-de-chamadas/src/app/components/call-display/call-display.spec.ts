import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallDisplay } from './call-display';

describe('CallDisplay', () => {
  let component: CallDisplay;
  let fixture: ComponentFixture<CallDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
