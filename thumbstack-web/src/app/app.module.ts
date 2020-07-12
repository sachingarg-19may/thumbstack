import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppCommonModule } from '../core/helpers/app-common-module';
import { AppCoreModule } from '../core/core.module';
import { FoodItemModule } from './food-item/food-item.module';
import { OrderModule } from './order/order.module';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppCommonModule,
    AppCoreModule,
    FoodItemModule,
    OrderModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
