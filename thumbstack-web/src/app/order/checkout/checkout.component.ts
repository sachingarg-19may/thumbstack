import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export const CHECKOUT_MODAL_NAME = 'Checkout modal';

@Component({
  selector: 'checkout-modal',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutModalComponent implements OnInit {

tip: number = 0;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onClose() {
      this.activeModal.close(this.tip);
  }
}