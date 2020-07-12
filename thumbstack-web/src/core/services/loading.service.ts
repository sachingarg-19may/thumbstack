import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModalComponent } from '../components/modals/loading-modal/loading-modal.component';

@Injectable()
export class LoadingService {
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  show() {
    if (!this.modalRef) {
      this.modalRef = this.modalService.open(LoadingModalComponent, { centered: true } );
    }
    
  }

  hide() {
    if (this.modalRef) {
      this.modalRef.dismiss(true);
      this.modalRef = null;
    }
  }
}
