import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDirectionComponent } from './update-direction.component';

describe('UpdateDirectionComponent', () => {
  let component: UpdateDirectionComponent;
  let fixture: ComponentFixture<UpdateDirectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDirectionComponent]
    });
    fixture = TestBed.createComponent(UpdateDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
