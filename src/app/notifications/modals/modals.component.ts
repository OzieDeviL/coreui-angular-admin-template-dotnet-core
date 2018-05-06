import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'notifications-modals',
  templateUrl: './modals.component.html'
})
export class ModalsComponent {
  title: string;
  closeBtn: boolean = true;
  closeBtnName: string = "Close";
  routeBtn: boolean = false;
  routeBtnName: string = "Close";
  route: string;
  Body: any[];

  constructor(public bsModalRef: BsModalRef) {
  }
}
