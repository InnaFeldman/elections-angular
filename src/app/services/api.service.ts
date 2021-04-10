import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/apiResponse';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPartiCountByElectionNumber(numOfElection: number): Observable<number> {
    return this.http.get<ApiResponse>(`https://israel-elections-1.s3.eu-west-3.amazonaws.com/${numOfElection}/allResults.json`)
      .pipe(
        map(res => Object.keys(res.realResults).length),
        catchError(error => {
          console.log(error);
          return of(0);
        })
      )
  }
}
