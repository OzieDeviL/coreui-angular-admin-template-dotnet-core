import { Component, ErrorHandler, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomAccountValidators } from "../../custom-account-validators";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { AccountService } from '../account.service';
import { AccountRegistration } from "../account-data-models";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  inputs: ["returnUrl"],
  providers: [AccountService]
})
export class RegisterComponent {
  @Input() returnUrl;

  router: Router;
  registrationForm: FormGroup;
  vendorOauthImplemented: {} = {
    any: false,
    facebook: false,
    twitter: false
  }

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { 
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
      this.accountService.postNewUserRegistration(userRegistration)
        .subscribe({
          next: x => console.log('Observer got a next value ' + x),
          error: x=> console.error('Observer got an error ' + x)
        });     
      //TODO Modal Pop-up
    } else {
      throw new console.error("Invalid Form");
    }
  }
}
