import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'notifications-modal-success',
  templateUrl: './modal-success.component.html'
})
export class ModalSuccessComponent {
  title: string = "Success";
  closeBtn: boolean = true;
  closeBtnName: string = "Default";
  routeBtn: boolean = false;
  routeBtnName: string = "Default";
  route: string;
  Body: any[] = ['Default body'];

  constructor(public bsModalRef: BsModalRef) {
  }
}
