import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGerantComponent } from './update-gerant.component';

describe('UpdateGerantComponent', () => {
  let component: UpdateGerantComponent;
  let fixture: ComponentFixture<UpdateGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateGerantComponent]
    });
    fixture = TestBed.createComponent(UpdateGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
