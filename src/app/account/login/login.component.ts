import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";

import { AccountService } from '../account.service';

import { LoginRequest, ForgotPasswordRequest } from '../account-data-models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalSuccessComponent } from '../../notifications/modals/modal-success.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  @Input() returnUrl: string = '/dashboard';

  isPending = false;
  form: FormGroup;
  badRequest = false;
  forgottenPassword = false;
  bsModalRef: BsModalRef;

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private bsModalService: BsModalService,
    ) {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    })
  }

  loginErrorHandler(httpErrorResponse: HttpErrorResponse): void {
    switch (httpErrorResponse.error[""][0])
    {
      case "Invalid login attempt.":
        this.badRequest = true;
        this.form.markAsPristine();
        break;
      case "The Email field is required" || "The Password field is required":
        //TODO 500 code for user       
      default:
        break;
    }
  }

  onSubmitLogin(): void {
    this.isPending = true;
    const loginRequest = new LoginRequest(this.email.value, this.password.value);
    this.accountService.login(loginRequest)
      .subscribe({
        next: response => {
          this.isPending = false;
          if (response.ok) {
            this.router.navigateByUrl(this.returnUrl);
          }
        },
        error: response => {
          this.isPending = false;
          this.loginErrorHandler(response)
        }
      })
  }

  forgotPassword() {
    this.isPending = true;
    const forgotPasswordRequestBody = new ForgotPasswordRequest(this.email.value); 
    this.accountService.forgotPassword(forgotPasswordRequestBody)
      .subscribe({
        next: response => {
          this.isPending = false;
          const modalOptions = {
            class: 'modal-success',
            initialState: {
              title: 'One more step',
              body: ['Check your email for a link to reset your password'],
              closeBtn: true,
              routeBtn: false,
            }
          }
          this.bsModalRef = this.bsModalService.show(ModalSuccessComponent, modalOptions)
          this.forgottenPassword = false;
        },
        error: response => {
          this.badRequest = true;
          this.isPending = false;
        } 
      })
  }

  toggleLoginReset() {
    this.forgottenPassword = !this.forgottenPassword;
    this.badRequest = false;
  }

}
