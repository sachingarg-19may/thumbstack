import { NgModule } from '@angular/core';
import { AppCommonModule } from '../helpers/app-common-module';
import { ModalsModule } from './modals/modals.module';


@NgModule({
  declarations: [],
  imports: [
    AppCommonModule
  ],
  exports: [    
    ModalsModule
  ],
  entryComponents: [  ]
})

export class AppComponentModule { }
