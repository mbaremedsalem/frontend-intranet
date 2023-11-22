import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionComponent } from './direction.component';

describe('DirectionComponent', () => {
  let component: DirectionComponent;
  let fixture: ComponentFixture<DirectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectionComponent]
    });
    fixture = TestBed.createComponent(DirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
