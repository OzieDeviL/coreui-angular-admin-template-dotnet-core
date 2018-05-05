import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

import { AccountRegistration, LoginRequest, ForgotPasswordRequest } from "./account-data-models";
import { concat } from 'rxjs/operators/concat';

@Injectable()
export class AccountService {
  accountResources = {
    prefix: 'api/account/',
    register: 'register',
    login: 'login',
    resetPassword: 'forgotPassword'
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  login(loginRequestBody: LoginRequest): Observable<HttpResponse<any>> {
    //get verb to login endpoint clears cookies for a clean login
    return this.http.post<HttpResponse<any>>(
      this.accountResources.prefix + this.accountResources.login,
      loginRequestBody,
      {observe: 'response'}
    ).pipe(tap(
      successResponse => { },
      errorResponse => this.handleError<HttpErrorResponse>('login', errorResponse)
    ))
  }

  register(registrationRequestBody: AccountRegistration): Observable<any> {
    return this.http.post<AccountRegistration>(
      this.accountResources.prefix + this.accountResources.register,
      registrationRequestBody,
      this.httpOptions
        ).pipe(tap(
          successResult => { },
          errorResult => this.handleError<HttpErrorResponse>('register', errorResult)
    ))
  }

  forgotPassword(forgotPasswordRequestBody: ForgotPasswordRequest ): Observable<any> {
    return this.http.post<HttpResponse<any>>(
      this.accountResources.prefix + this.accountResources.resetPassword,
      forgotPasswordRequestBody,
      this.httpOptions)
        .pipe(tap(
          successResult => { },
          errorResult => this.handleError<HttpErrorResponse>('forgotPassword', errorResult)
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
      return of(result as T);
    }
  }

}
