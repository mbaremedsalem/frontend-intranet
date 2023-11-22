import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAgentComponent } from './confirm-agent.component';

describe('ConfirmAgentComponent', () => {
  let component: ConfirmAgentComponent;
  let fixture: ComponentFixture<ConfirmAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmAgentComponent]
    });
    fixture = TestBed.createComponent(ConfirmAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
