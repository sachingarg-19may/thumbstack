import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class HttpBase {

  protected baseUrl: string;

  constructor(private httpClient: HttpClient) {}

  protected get(relativeUrl: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + relativeUrl)
      .pipe(catchError(this.handleError));
  }

  protected post(relativeUrl: string, model: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + relativeUrl, model)
      .pipe(catchError(this.handleError));
  }

  protected put(relativeUrl: string, model: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + relativeUrl, model)
      .pipe(catchError(this.handleError));
  }

  protected delete(relativeUrl: string): Observable<any> {
    return this.httpClient.delete(this.baseUrl + relativeUrl)
      .pipe(catchError(this.handleError));
  }

  protected deleteWithBody(relativeUrl: string, model: any): Observable<any> {
    return this.httpClient.request('delete', this.baseUrl + relativeUrl, { body: model })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return throwError(error);
  }
}
