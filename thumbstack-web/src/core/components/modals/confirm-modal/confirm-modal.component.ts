import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export const CONFIRM_MODAL_NAME = 'Confirm modal';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  tip: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}