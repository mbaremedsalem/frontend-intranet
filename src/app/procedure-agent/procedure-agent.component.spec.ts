import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureAgentComponent } from './procedure-agent.component';

describe('ProcedureAgentComponent', () => {
  let component: ProcedureAgentComponent;
  let fixture: ComponentFixture<ProcedureAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedureAgentComponent]
    });
    fixture = TestBed.createComponent(ProcedureAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
