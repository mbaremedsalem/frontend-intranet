import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiqueBanqueComponent } from './politique-banque.component';

describe('PolitiqueBanqueComponent', () => {
  let component: PolitiqueBanqueComponent;
  let fixture: ComponentFixture<PolitiqueBanqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolitiqueBanqueComponent]
    });
    fixture = TestBed.createComponent(PolitiqueBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
