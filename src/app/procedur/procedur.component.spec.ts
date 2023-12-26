import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedurComponent } from './procedur.component';

describe('ProcedurComponent', () => {
  let component: ProcedurComponent;
  let fixture: ComponentFixture<ProcedurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedurComponent]
    });
    fixture = TestBed.createComponent(ProcedurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
