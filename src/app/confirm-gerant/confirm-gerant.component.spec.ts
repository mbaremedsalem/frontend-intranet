import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmGerantComponent } from './confirm-gerant.component';

describe('ConfirmGerantComponent', () => {
  let component: ConfirmGerantComponent;
  let fixture: ComponentFixture<ConfirmGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmGerantComponent]
    });
    fixture = TestBed.createComponent(ConfirmGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
