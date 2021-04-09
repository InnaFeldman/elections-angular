import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Election } from '../interfaces/election';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //We are getting the api data, we are returning an observable
  fetchPartyResult(electionID){
    return this.http.get<any[]>(this.getURLByElection(electionID))
  }

  //here are we need to put election number so we have the URL to fetch!
  getURLByElection(electionID){
    return `https://israel-elections-1.s3.eu-west-3.amazonaws.com/${electionID}/allResults.json`
  }


}
