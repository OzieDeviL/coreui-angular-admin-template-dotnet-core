import { Component, ErrorHandler, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomAccountValidators } from "../custom-account-validators";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal'
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

import { AccountService } from '../account.service';
import { AccountRegistration } from "../account-data-models";
import { Title } from '@angular/platform-browser';
import { ModalsComponent } from '../../notifications/modals/modals.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  inputs: ["returnUrl"],
  providers: [AccountService]
})
export class RegisterComponent {
  @Input() returnUrl = '/dashboard';
  
  bsModalRef: BsModalRef;
  registrationForm: FormGroup;
  alreadyRegisteredEmail: string;
  isPending = false;
  
  vendorOauthImplemented: {} = {
    any: false,
    facebook: false,
    twitter: false
  }

  get email() { return this.registrationForm.get('email') };
  get password() { return this.registrationForm.get('password') };
  get confirmPassword() { return this.registrationForm.get('confirmPassword') };
  
  constructor(
    private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private modalService: BsModalService,
    private router: Router
  ) { 
    this.createForm(); 
  }

  createForm() {
    this.registrationForm = this.formBuilder.group(
      { email: ['', Validators.compose(
            [Validators.required, Validators.email]
          )
        ],
        password: ['', Validators.compose(
          [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,256})\S$/)]
        )],
        confirmPassword: ['', Validators.required]
      },
      {validator: CustomAccountValidators.matchPassword}    
    )
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      let userRegistration = new AccountRegistration(
        this.email.value, 
        this.password.value,
        this.confirmPassword.value)
      this.isPending = true;
      this.accountService.register(userRegistration)
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
    const options = {
      class: 'modal-danger',
      initialState: {
        title: 'Error',
        body: [
          'Sorry. Something went wrong on our end, please retry.',
          'If this error persists, please try again later.'  
        ]
      },
    };
    this.bsModalRef = this.modalService.show(ModalsComponent, options);
  }

  openSuccessModal() {
    this.modalService.onShown.subscribe({
      next: x => { this.router.navigateByUrl(this.returnUrl) }
    })
    const options = { 
      class: 'modal-success',
      ignoreBackdropClick: true,
      initialState: {
        title: 'Registration Successful!',
        body: [`Thanks for joining, ${this.email.value}. Check your email to confirm your account.`],
        closeBtn: true,
        routeBtn: false,
        closeBtnName: 'Close'
      }
    };
    this.bsModalRef = this.modalService.show(ModalsComponent, options);
  }

  handleErrors(result: HttpErrorResponse) {
    if (result.error.errors[0].code === 'DupicateUserName') {
        this.alreadyRegisteredEmail = this.email.value;
    } else if (500 <= result.status && result.status <=599) {
      this.open500ErrorModal();
    }
    this.isPending = false;
  }
}
