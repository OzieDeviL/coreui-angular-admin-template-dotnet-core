import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

import { AccountRegistration } from "./account-data-models";

@Injectable()
export class AccountService {
  accountResources = {
    prefix: 'api/account/',
    register: 'register'
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  postNewUserRegistration(newUserRegistration: AccountRegistration): Observable<any> {
    return this.http.post<AccountRegistration>(
      this.accountResources.prefix + this.accountResources.register,
      newUserRegistration,
      this.httpOptions
    ).pipe(tap(
      successResult => {},
      errorResult => this.handleError<HttpErrorResponse>('postNewUserRegistration', errorResult)
    ))
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (result: any): Observable<T> => {
      console.error('service handleError activated for: ' + operation, result);
      return of(result as T);
    }
  }

}
