import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {Election} from './interfaces/election';
import { Party } from './interfaces/party';
import { PartyResult } from './interfaces/partyResult';
import { ApiService } from './services/api.service';
import {HttpClient} from '@angular/common/http';
import { forkJoin, from , Observable} from 'rxjs';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // error: boolean = false;

  // putDataInChart: boolean = false;
  // loading: boolean = true;
  endSubs$ = new Subject();
  loadedCharacter: {};

  chartDatasets = [
    {data: [], label: 0}
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
    {date: new Date(2019, 8, 17), number: 22, ahuzHasima: 3.25, partyResults: [], numberOfPartiesThatPassedAhuzHasima: 0},
    {date: new Date(2020, 2, 2), number: 23, ahuzHasima: 3.25, partyResults: [], numberOfPartiesThatPassedAhuzHasima: 0},
    {date: new Date(2021, 2, 23), number: 24, ahuzHasima: 3.25, partyResults: [], numberOfPartiesThatPassedAhuzHasima: 0},
  ];

  results: PartyResult[] = [];

  constructor(private http: HttpClient, private ref: ChangeDetectorRef){};



  ngOnInit(): void {

    this.elections.map(election => {
      this.http.get(`https://israel-elections-1.s3.eu-west-3.amazonaws.com/${election.number}/allResults.json`).subscribe((result: any) => {
        let objLength = Object.keys(result.realResults).length;
        election.numberOfPartiesThatPassedAhuzHasima = objLength;
        this.chartDatasets = [{data: [...this.chartDatasets[0].data, election.numberOfPartiesThatPassedAhuzHasima], label: 2}];
        // this.chartDatasets.push({data: [election.numberOfPartiesThatPassedAhuzHasima], label: result.time});
        this.chartLabels.push(result.time);
      },
      err => console.log('Error loading a data'),
      () => console.log('All requests have finished')
      )
    })





    // from(this.elections).pipe(
    //   mergeMap(num => this.http.get(`https://israel-elections-1.s3.eu-west-3.amazonaws.com/${num.number}/allResults.json`)),
    //   takeUntil(this.endSubs$)
    // ).subscribe(
    //   (result: any) => {
    //     if(result) {
    //       let objLength = Object.keys(result.realResults).length;
    //       this.elections.map(e => {
    //         e.numberOfPartiesThatPassedAhuzHasima = objLength;
    //       })
    //     }
    //   },
    //   err => console.log('Error loading a data'),
    //   () => console.log('All requests have finished')
    // )

    // console.log(this.elections)
    // //console.log(this.chartDatasets)
  }

  // setChartData(){}

  // ngOnDestory() {
  //   this.endSubs$.next();
  //   this.endSubs$.complete();
  // }


}


