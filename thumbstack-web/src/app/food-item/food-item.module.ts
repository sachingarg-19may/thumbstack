import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../core/helpers/app-common-module';
import { AppCoreModule } from '../../core/core.module';
import { FoodItemRoutingComponents, FoodItemRoutingModule } from './food-item.routing';

@NgModule({
  declarations: [
    FoodItemRoutingComponents
  ],
  imports: [
    AppCommonModule,
    AppCoreModule,
    FoodItemRoutingModule
  ],
  entryComponents: [
    
  ],
  exports: []
})

export class FoodItemModule { }
