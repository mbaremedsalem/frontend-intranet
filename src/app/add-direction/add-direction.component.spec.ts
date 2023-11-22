import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectionComponent } from './add-direction.component';

describe('AddDirectionComponent', () => {
  let component: AddDirectionComponent;
  let fixture: ComponentFixture<AddDirectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDirectionComponent]
    });
    fixture = TestBed.createComponent(AddDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
