import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DataModel } from '../models/DataModel';

@Injectable({
  providedIn: 'any',
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl:string = 'https://images-api.nasa.gov/search?q=';

  askApi(searchText: string):Observable<DataModel> {
    return this.http.get<DataModel>(`${this.configUrl}${searchText}`)
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message);
  } 

  askJson(address: string):Observable<string> {
    return this.http.get<string>(address)
    .pipe(catchError(this.errorHandler))
  }

}