import { Component, ErrorHandler, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomAccountValidators } from "../../custom-account-validators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  inputs: ["returnUrl"]
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

  constructor(private formBuilder: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.formBuilder.group(
      { email: ['', Validators.compose(
            [Validators.required, Validators.email]
          )
        ],
        password: ['', Validators.compose(
          [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,256})\S$/)]
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
      console.log(this.registrationForm.value);
      //TODO Modal Pop-up
      this.router.navigateByUrl(this.returnUrl);
    } else {
      throw new console.error("Invalid Form");
      
    }
    console.log(this.registrationForm.value);
  }
}
