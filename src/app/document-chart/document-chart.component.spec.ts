import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentChartComponent } from './document-chart.component';

describe('DocumentChartComponent', () => {
  let component: DocumentChartComponent;
  let fixture: ComponentFixture<DocumentChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentChartComponent]
    });
    fixture = TestBed.createComponent(DocumentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
