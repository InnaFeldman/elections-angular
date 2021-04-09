import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {Election} from './interfaces/election';
import { Party } from './interfaces/party';
import { PartyResult } from './interfaces/partyResult';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  error: boolean = false;

  putDataInChart: boolean = false;
  loading: boolean = true;

  chartDatasets = [
    { data: [], label: 'Elections' }
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
    responsive: true
  };


  elections: Election[] = [
    {date: new Date(2019, 8, 17), number: 22, ahuzHasima: 3.25, partyResults: [], numberOfPartiesThatPassedAhuzHasima: 0, loadingAPICall: true},
    {date: new Date(2020, 2, 2), number: 23, ahuzHasima: 3.25, partyResults: [], numberOfPartiesThatPassedAhuzHasima: 0, loadingAPICall: true},
    {date: new Date(2021, 2, 23), number: 24, ahuzHasima: 3.25, partyResults: [], numberOfPartiesThatPassedAhuzHasima: 0, loadingAPICall: true},
  ];

  // parties: Party[] = [
  //   {"symbol":"ודעם"},
  //   {"symbol":"כן"},
  //   {"symbol":"עם"},
  //   {"symbol":"שס"},
  //   {"symbol":"ג"},
  //   {"symbol":"מחל"},
  //   {"symbol":"ט"},
  //   {"symbol":"מרצ"},
  //   {"symbol":"אמת"},
  //   {"symbol":"ת"},
  //   {"symbol":"ב"},
  //   {"symbol":"ל"},
  //   {"symbol":"פה"}
  // ];

  results: PartyResult[] = [];

  constructor(public apiService: ApiService){

  };



  ngOnInit(): void {
    //we start by looping through our elections
    //for each election we use our api service to get the api result. we use the number to get the url using
    //the helping function we built (getURLByElection)
    this.elections.map(election => {
      this.apiService.fetchPartyResult(election.number)
      .subscribe(
        //subscribe first callback is if the api call has succeeded !!
        //first we set the loading to false, since we got a result
        // we are checking that the returned object has an object called 'real results' in it
        //if it does not - error is true!
        (x:any) => {
          election.loadingAPICall = false;
          if(x.realResults){
            //if we have real results - we need the number of parties in this object
            //because this api only returns the number of parties that passed ahuz hasima!
            //we use object.keys to get the array ready for length
            election.numberOfPartiesThatPassedAhuzHasima = Object.keys(x.realResults).length;
          }
          else{
            this.error = true;
          }
          this.checkIfComplete()
      },
      err => {
        //this happens when api returns error like if the url is wrong!!
        this.error = true;
        election.loadingAPICall = false;
      })
    })


  }

  //we are checking if we are loading any data, if so - show spinner!
  checkIfComplete(){
    //Filter all elections to only show ones still loading and count how many there are.
    let numberOfElectionsLoading = this.elections.filter(x => {return x.loadingAPICall}).length
    //Number of elections that still need to load data from API = numberOfElectionsLoading!
    if(numberOfElectionsLoading > 0 && !this.error && !this.putDataInChart){
      this.setChartData()
    }
    this.loading =  numberOfElectionsLoading > 0;
  }


  setChartData(){
   this.elections.map((election) => {
    //  this.chartLabels.push(elections.number)
     console.log(election.numberOfPartiesThatPassedAhuzHasima)
    //  this.chartDatasets[0].data.push(elections.numberOfPartiesThatPassedAhuzHasima);
   })

    console.log(this.chartDatasets);

    this.putDataInChart = true;
  }




}
