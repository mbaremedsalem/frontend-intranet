import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArchiveComponent } from './add-archive.component';

describe('AddArchiveComponent', () => {
  let component: AddArchiveComponent;
  let fixture: ComponentFixture<AddArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArchiveComponent]
    });
    fixture = TestBed.createComponent(AddArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
