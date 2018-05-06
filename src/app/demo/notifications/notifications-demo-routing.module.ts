import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertsDemoComponent } from './alerts-demo.component';
import { BadgesDemoComponent } from './badges-demo.component';
import { ModalsDemoComponent } from './modals-demo.component';

const routes: Routes = [
  {
    path: 'notifications',
    data: {
      title: 'Notifications'
    },
    children: [
      {
        path: 'alerts',
        component: AlertsDemoComponent,
        data: {
          title: 'Alerts'
        }
      },
      {
        path: 'badges',
        component: BadgesDemoComponent,
        data: {
          title: 'Badges'
        }
      },
      {
        path: 'modals',
        component: ModalsDemoComponent,
        data: {
          title: 'Modals'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsDemoRoutingModule {}
