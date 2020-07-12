import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../core/helpers/app-common-module';
import { AppCoreModule } from '../../core/core.module';
import { OrderRoutingModule, OrderRoutingComponents } from './order.routing';
import { CheckoutModalComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    OrderRoutingComponents,
    CheckoutModalComponent
  ],
  imports: [
    AppCommonModule,
    AppCoreModule,
    OrderRoutingModule
  ],
  entryComponents: [
    CheckoutModalComponent
  ],
  exports: [CheckoutModalComponent]
})

export class OrderModule { }
