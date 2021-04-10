import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    let election_22 = this.http.get('https://israel-elections-1.s3.eu-west-3.amazonaws.com/22/allResults.json');
    let election_23 = this.http.get('https://israel-elections-1.s3.eu-west-3.amazonaws.com/23/allResults.json');
    let election_24 = this.http.get('https://israel-elections-1.s3.eu-west-3.amazonaws.com/24/allResults.json');

    return forkJoin([election_22, election_23, election_24]);
  }


}
