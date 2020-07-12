import { NgModule } from '@angular/core';
import { AppStoreModule } from './store/store.module';
import { AppComponentModule } from './components/ft-component.module';
import { AppServiceModule } from './services/service.module';

@NgModule({
  imports: [
    AppStoreModule,
    AppServiceModule
  ],
  exports: [
    AppComponentModule
  ],
  providers: [],
  declarations: []
})

export class AppCoreModule { }
