import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

import { AccountRegistration, LoginRequest, ForgotPasswordRequest, ResetPasswordRequest } from "./account-data-models";
import { concat } from 'rxjs/operators/concat';

@Injectable()
export class AccountService {
  accountResources = {
    prefix: 'api/account/',
    register: 'register',
    login: 'login',
    forgotPassword: 'forgotPassword',
    resetPassword: 'resetPassword'
    
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
      (errorResponse: HttpErrorResponse) => this.handleError<HttpErrorResponse>('login', errorResponse)
    ))
  }

  register(registrationRequestBody: AccountRegistration): Observable<any> {
    return this.http.post<AccountRegistration>(
      this.accountResources.prefix + this.accountResources.register,
      registrationRequestBody,
      this.httpOptions
        ).pipe(tap(
          successResult => { },
          (errorResponse: HttpErrorResponse) => this.handleError<HttpErrorResponse>('register', errorResponse)
    ))
  }

  forgotPassword(forgotPasswordRequestBody: ForgotPasswordRequest ): Observable<any> {
    return this.http.post<HttpResponse<any>>(
      this.accountResources.prefix + this.accountResources.forgotPassword,
      forgotPasswordRequestBody,
      this.httpOptions)
        .pipe(tap(
          successResult => { },
          (errorResponse: HttpErrorResponse) => this.handleError<HttpErrorResponse>('forgotPassword', errorResponse)
      ))
  }

  resetPassword(passwordResetRequestBody: ResetPasswordRequest ): Observable<any> {
    return this.http.post<HttpResponse<any>>(
      this.accountResources.resetPassword,
      this.accountResources.prefix + this.accountResources.resetPassword,
      this.httpOptions
    ).pipe(tap(
      successResponse => {},
      (errorResponse: HttpErrorResponse) => { this.handleError<HttpErrorResponse>('resetPassword', errorResponse) }
    ))
    
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
 */
  private handleError<HttpErrorResponse>(operation = 'operation', result?: HttpErrorResponse) {
    return (result: any): Observable<HttpErrorResponse> => {
      return of(result as HttpErrorResponse);
    }
  }

}
