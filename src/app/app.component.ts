import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {Election} from './interfaces/election';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  chartDatasets = [
    {data: [], label: ''}
  ];


  chartLabels: any[] = [];

  chartColors: any[] = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };


  elections: Election[] = [
    {date: new Date(2019, 8, 17), number: 22, ahuzHasima: 3.25,  numberOfPartiesThatPassedAhuzHasima: 0},
    {date: new Date(2020, 2, 2), number: 23, ahuzHasima: 3.25, numberOfPartiesThatPassedAhuzHasima: 0},
    {date: new Date(2021, 2, 23), number: 24, ahuzHasima: 3.25, numberOfPartiesThatPassedAhuzHasima: 0},
  ];

  constructor(private apiService: ApiService){};


  ngOnInit(): void {

    this.elections.map(election => {
      this.apiService.getPartiCountByElectionNumber(election.number).subscribe((partiesNumber: number) => {
          election.numberOfPartiesThatPassedAhuzHasima = partiesNumber;
          this.chartDatasets = [{data: [...this.chartDatasets[0].data, election.numberOfPartiesThatPassedAhuzHasima], label: "Parties"}];
          let year = election.date.getFullYear();
          this.chartLabels.push(year);
      }
      )
    })
  }
}


