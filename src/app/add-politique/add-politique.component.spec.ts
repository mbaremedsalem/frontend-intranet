import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolitiqueComponent } from './add-politique.component';

describe('AddPolitiqueComponent', () => {
  let component: AddPolitiqueComponent;
  let fixture: ComponentFixture<AddPolitiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPolitiqueComponent]
    });
    fixture = TestBed.createComponent(AddPolitiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
