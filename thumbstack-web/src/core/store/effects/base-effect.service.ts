import { Injectable } from '@angular/core';
import { AlertService } from 'src/core/services/alert.service';
import { LoadingService } from 'src/core/services/loading.service';

@Injectable()
export class BaseEffectService {
    constructor(public alertService: AlertService,
        public loadingService: LoadingService) {
            
    }

    public showErrorAlert(error: any, message: string) {
        this.loadingService.hide();
        
        if (error) {
            this.alertService.error(message);
            this.alertService.error(error.message);
        }
    }

    public showSuccessAlert(message: string) {
        this.loadingService.hide();
        this.alertService.success(message);
    }
}
