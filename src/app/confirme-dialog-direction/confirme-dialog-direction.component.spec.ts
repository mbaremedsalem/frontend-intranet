import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmeDialogDirectionComponent } from './confirme-dialog-direction.component';

describe('ConfirmeDialogDirectionComponent', () => {
  let component: ConfirmeDialogDirectionComponent;
  let fixture: ComponentFixture<ConfirmeDialogDirectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmeDialogDirectionComponent]
    });
    fixture = TestBed.createComponent(ConfirmeDialogDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
