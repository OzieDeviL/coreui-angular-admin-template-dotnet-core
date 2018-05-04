import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'notifications-modal-success',
  templateUrl: './modal-success.component.html'
})
export class ModalSuccessComponent implements OnInit {
  title: string = "Success";
  primaryBtnName: string = "Close";
  includeSecondaryBtn: boolean = false;
  secondaryBtnName: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) {
  }

  // get title () { return this.bsModalRef.content.title};
  // get primaryBtnName () { return this.bsModalRef.content.primaryBtnName};
  // get includeSecondaryBtn () { return this.bsModalRef.content.includeSecondaryBtn};
  // get secondaryBtnName () { return this.bsModalRef.content.secondaryBtnName};
  // get list () { return this.bsModalRef.content.list};

  ngOnInit() { this.list.push("On pirate satellite."); }

  closeModal() {
    this.bsModalRef.hide();
  }
}
