// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertsDemoComponent } from './alerts-demo.component';

import { BadgesDemoComponent } from './badges-demo.component';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsDemoComponent } from './modals-demo.component';

// Notifications Routing
import { NotificationsDemoRoutingModule } from './notifications-demo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationsDemoRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    AlertsDemoComponent,
    BadgesDemoComponent,
    ModalsDemoComponent,
  ],
})
export class NotificationsDemoModule { }
