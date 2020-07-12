import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../components/modals/confirm-modal/confirm-modal.component';

@Injectable()
export class FormControlService {
  maxDate: any;
  modalRef: NgbModalRef;
  constructor(public fb: FormBuilder,
    public modalService: NgbModal) { 
    
  }

  getErrors(form: FormGroup, controlName: string, submitted: boolean) {
    let control = form.controls[controlName];
    if ((control.dirty && control.invalid) || submitted) {
      return control.errors;
    }

    return null;
  }

  removeValidator(form: FormGroup, control: string, removeValue: boolean = true) {
    if (removeValue) {
      form.controls[control].patchValue(null);
    }
    
    form.controls[control].setValidators(null);
    form.controls[control].setErrors(null);
  }

  setValidator(form: FormGroup, control: string, validators: any, removeValue: boolean = true) {
    if (removeValue) {
      form.controls[control].patchValue(null);
    }
    
    form.controls[control].setValidators(validators);
    form.controls[control].setErrors(null);
  }

  createModal(title: string, message: string) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { centered: true } );
    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.message = message;
  }
}


