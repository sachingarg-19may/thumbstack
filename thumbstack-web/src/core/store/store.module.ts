import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { foodItemReducer } from './reducers/food-item.reducer';
import { orderReducer } from './reducers/order.reducer';
import { FoodItemEffects } from './effects/food-item.effect';
import { OrderEffects } from './effects/order.effect';

@NgModule({
  imports: [
    HttpClientModule,  
    StoreModule.forRoot({}), 
    EffectsModule.forRoot([]),    
    StoreModule.forFeature('food-item', foodItemReducer),
    StoreModule.forFeature('order', orderReducer),
    EffectsModule.forFeature([
      FoodItemEffects, OrderEffects
    ])
  ]
})

export class AppStoreModule { }
