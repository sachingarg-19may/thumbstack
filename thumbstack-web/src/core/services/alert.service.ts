import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AlertService {
  constructor(private toastr: ToastrService) {
  }

  success(message: string) {
    if (message) {
      this.toastr.success('', message, {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    }
  }

  error(message: string) {
    if (message) {
      this.toastr.error('', message, {
        timeOut: 0,
        positionClass: 'toast-top-center',
        closeButton: true
      });
    }
  }

  info(message: string) {
    if (message) {
      this.toastr.info('', message, {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    }
  }

  warn(message: string) {
    if (message) {
      this.toastr.warning('', message, {
        timeOut: 0,
        positionClass: 'toast-top-center',
        closeButton: true
      });
    } 
  }
}
