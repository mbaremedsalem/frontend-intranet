import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-document-chart',
  templateUrl: './document-chart.component.html',
  styleUrls: ['./document-chart.component.css']
})
export class DocumentChartComponent {

  ngOnInit(): void {
    
  }
  lineChart=new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Document'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Document admitted',
        data: [10, 2, 3,6,9,17,20,10,5,2,16]
      } as any
    ]

  })

  pieChart=new Chart({
    chart: {
      type: 'pie',
      plotShadow: false,
    },
  
    credits: {
      enabled: false,
    },
  
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 10,
        borderColor: '',
        slicedOffset: 10,
        dataLabels: {
          connectorWidth: 0,
        },
      },
    },
  
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'AUB',
    },
  
    legend: {
      enabled: false,
    },
  
    series: [
      {
        type: 'pie',
        data: [
          { name: 'FORMATION/CBS', y: 1, color: '#eeeeee' },
  
          { name: 'AVIS/PROTECTION', y: 2, color: '#393e46' },

          { name: 'FETE INTER', y: 3, color: '#00adb5' },
          { name: 'MEET AUB', y: 4, color: '#eeeeee' },
          { name: 'AUB', y: 5, color: '#506ef9' },
        ],
      },
    ],
  })
}
