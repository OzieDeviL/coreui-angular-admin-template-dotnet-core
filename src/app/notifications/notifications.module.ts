// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from "@angular/router";

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from './modals/modals.component';
import { Modal500Component } from './modal-500/modal-500.component';

import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ModalsComponent,
    Modal500Component,
  ],
  entryComponents: [
    ModalsComponent,
    Modal500Component
  ],
  exports: [
    ModalsComponent,
    Modal500Component,
    RouterModule,
  ],
  providers: [
    BsModalService
  ]
})
export class NotificationsModule { 
}
