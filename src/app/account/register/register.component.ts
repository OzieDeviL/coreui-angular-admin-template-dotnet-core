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
import { ModalSuccessComponent } from '../../notifications/modals/modal-success.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  inputs: ["returnUrl"],
  providers: [AccountService]
})
export class RegisterComponent {
  @Input() returnUrl;

  bsModalRef: BsModalRef;
  router: Router;
  registrationForm: FormGroup;
  alreadyRegisteredEmail: string;
  isPending = false;
  
  vendorOauthImplemented: {} = {
    any: false,
    facebook: false,
    twitter: false
  }

  constructor(
    private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private modalService: BsModalService
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

  get email() { return this.registrationForm.get('email') };
  get password() { return this.registrationForm.get('password') };
  get confirmPassword() { return this.registrationForm.get('confirmPassword') };

  onSubmit() {
    if (this.registrationForm.valid) {
      let userRegistration = new AccountRegistration(
        this.email.value, 
        this.password.value,
        this.confirmPassword.value)
      this.isPending = true;
      this.accountService.postNewUserRegistration(userRegistration)
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

  openSuccessModal() {
    const initialState = { 
      class: 'modal-success',
      ignoreBackdropClick: true
    };
    this.bsModalRef = this.modalService.show(ModalSuccessComponent, initialState);
    this.bsModalRef.content.list = [ `Thanks for joining, ${this.email.value}` ];
    this.bsModalRef.content.title = 'Registration Successful!';
  }

  handleErrors(result) {
    switch (result.error.errors[0].code) {
      case 'DuplicateUserName':
        this.alreadyRegisteredEmail = this.email.value;
        break;
      default:
        break;
    }
    this.isPending = false;
  }
}
