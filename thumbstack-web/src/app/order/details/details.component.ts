import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromOrderStore from '../../../core/store/reducers/order.reducer';
import { Subscription } from 'rxjs';
import { OrderModel } from '../../../core/models/order.models';

@Component({
  selector: 'app-order-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  
  currentOrder: OrderModel;
  orderSub: Subscription;
  constructor(private orderStore: Store<fromOrderStore.OrderState>) {       
  }

  ngOnInit() {
    this.orderSub = this.orderStore.select(fromOrderStore.getCurrent).subscribe(data => {
      this.currentOrder = data;
    });
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
  
  getTotal(index: number) {
    return (this.currentOrder.items[index].cost * this.currentOrder.items[index].quantity).toFixed(2);
  }

  getTotalQuantity() {
    return this.currentOrder.items.map(c => c.quantity).reduce((a, b) => a + b, 0);
  }
}
