import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerantComponent } from './gerant.component';

describe('GerantComponent', () => {
  let component: GerantComponent;
  let fixture: ComponentFixture<GerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerantComponent]
    });
    fixture = TestBed.createComponent(GerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
