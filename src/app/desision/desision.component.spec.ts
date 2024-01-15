import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesisionComponent } from './desision.component';

describe('DesisionComponent', () => {
  let component: DesisionComponent;
  let fixture: ComponentFixture<DesisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesisionComponent]
    });
    fixture = TestBed.createComponent(DesisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
