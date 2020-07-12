import { NgModule } from '@angular/core';
import { LoadingService } from './loading.service';
import { FoodItemService } from './food-item.service';
import { AlertService } from './alert.service';
import { FormControlService } from './form-control.service';
import { AppCommonModule } from '../helpers/app-common-module';
import { BaseEffectService } from '../store/effects/base-effect.service';
import { OrderService } from './order.service';

@NgModule({
  imports: [AppCommonModule],
  providers: [
    LoadingService,
    FoodItemService,
    AlertService,
    BaseEffectService,
    FormControlService,
    OrderService
  ],
  declarations: []
})

export class AppServiceModule { }
