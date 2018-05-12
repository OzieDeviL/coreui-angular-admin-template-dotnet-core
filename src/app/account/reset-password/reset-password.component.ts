import { Component, ErrorHandler } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomAccountValidators } from "../custom-account-validators";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal'
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

import { AccountService } from '../account.service';
import { AccountRegistration, ResetPasswordRequest } from "../account-data-models";
import { Title } from '@angular/platform-browser';
import { ModalsComponent } from '../../notifications/modals/modals.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  providers: [AccountService]
})
export class ResetPasswordComponent {
  
  bsModalRef: BsModalRef;
  resetPasswordForm: FormGroup;
  isPending = false;
  
  get email() { return this.resetPasswordForm.get('email') };
  get password() { return this.resetPasswordForm.get('password') };
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword') };
  
  constructor(
    private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private modalService: BsModalService,
    private router: Router
  ) { 
    this.createForm(); 
  }

  createForm() {
    this.resetPasswordForm = this.formBuilder.group(
      { 
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,256})\S$/)])],
        confirmPassword: ['', Validators.required]
      },
      {validator: CustomAccountValidators.matchPassword}    
    )
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      let resetPasswordRequest = new ResetPasswordRequest(
        this.email.value,
        this.password.value,
        this.confirmPassword.value)
      this.isPending = true;
      this.accountService.resetPassword(resetPasswordRequest)
        .subscribe({
          next: x => { 
            this.isPending = false;
            this.openSuccessModal();
          },
          error: result => this.handleErrors(result)
        })     
      //TODO Modal Pop-up
    } else {
      throw new console.error("Invalid Form");
    }
  }

  open500ErrorModal() {
    this.bsModalRef = this.modalService.show(ModalsComponent);
  }

  openSuccessModal() {
    this.modalService.onShown.subscribe({
      next: x => { this.router.navigateByUrl("/dashboard") }
    })
    const options = { 
      class: 'modal-success',
      ignoreBackdropClick: true,
      initialState: {
        title: 'Password Reset Successful!',
        body: [`Happy apping, ${this.email.value}.`],
        closeBtn: true,
        routeBtn: false,
        closeBtnName: 'Close'
      }
    };
    this.bsModalRef = this.modalService.show(ModalsComponent, options);
  }

  handleErrors(result: HttpErrorResponse) {
    // if (result.error.errors[0].code === 'DupicateUserName') {
    //     this.alreadyRegisteredEmail = this.email.value;
    // } else if (500 <= result.status && result.status <=599) {
    //   this.open500ErrorModal();
    // }
    this.isPending = false;
  }
}
