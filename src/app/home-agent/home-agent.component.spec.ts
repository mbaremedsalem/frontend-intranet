import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAgentComponent } from './home-agent.component';

describe('HomeAgentComponent', () => {
  let component: HomeAgentComponent;
  let fixture: ComponentFixture<HomeAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAgentComponent]
    });
    fixture = TestBed.createComponent(HomeAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
