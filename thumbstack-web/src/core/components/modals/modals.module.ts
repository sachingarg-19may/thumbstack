import { NgModule } from '@angular/core';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { AppCommonModule } from 'src/core/helpers/app-common-module';

@NgModule({
  declarations: [ConfirmModalComponent, LoadingModalComponent],
  imports: [
    AppCommonModule
  ],
  exports: [
    ConfirmModalComponent,
    LoadingModalComponent
  ],
  entryComponents: [ ConfirmModalComponent, LoadingModalComponent ]
})
export class ModalsModule { }
