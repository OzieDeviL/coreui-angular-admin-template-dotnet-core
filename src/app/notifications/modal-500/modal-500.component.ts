import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'notifications-modal-500',
  templateUrl: './modal-500.component.html',
})
export class Modal500Component {
  title: string = 'Error'
  closeBtn: boolean = true;
  closeBtnName: string = "Close";
  routeBtn: boolean = false;
  routeBtnName: string = "Close";
  route: string;
  Body: any[] = [
    'Sorry. Something went wrong on our end, please retry.',
    'If this error persists, please try again later.'  
  ]

  constructor(public bsModalRef: BsModalRef) {
  }
}
