import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexteGouvernanceComponent } from './texte-gouvernance.component';

describe('TexteGouvernanceComponent', () => {
  let component: TexteGouvernanceComponent;
  let fixture: ComponentFixture<TexteGouvernanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TexteGouvernanceComponent]
    });
    fixture = TestBed.createComponent(TexteGouvernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
