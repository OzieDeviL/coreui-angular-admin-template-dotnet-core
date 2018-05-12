import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account.routing';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { AccountService } from './account.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
  ],
  providers: [AccountService]
})
export class AccountModule { }
