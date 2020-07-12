import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromOrderStore from '../../../core/store/reducers/order.reducer';
import * as fromOrderActions from '../../../core/store/actions/order.action';
import { OrderModel } from '../../../core/models/order.models';
import { Router } from '@angular/router';
import { CheckoutModalComponent } from '../checkout/checkout.component';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    refreshSub: Subscription;
    orders: OrderModel[] = [];
    renderItems: OrderModel[] = [];
    tabSelection: string = 'Active';
    dataSub: Subscription;
    modalRef: NgbModalRef;
    constructor(private orderStore: Store<fromOrderStore.OrderState>,
        private router: Router,
        public modalService: NgbModal) {
    }

    ngOnInit() {
        this.orderStore.dispatch(new fromOrderActions.Load());

        this.refreshSub = this.orderStore.select(fromOrderStore.getRefresh).subscribe(refresh => {
            if (refresh) {
                this.orderStore.dispatch(new fromOrderActions.Load());
            } 
        });

        this.dataSub = this.orderStore.select(fromOrderStore.getAll).subscribe(data => {
            if (data) {
                this.orders = data;
                this.onTabSelection(this.tabSelection);
            } 
        });
    }

    onTabSelection(filter: string) {
        this.tabSelection = filter;
        this.renderItems = this.orders.filter(c => c.status === (this.tabSelection === 'Active' ? 'On-going' : 'Completed'));
    }

    ngOnDestroy(): void {
        this.refreshSub.unsubscribe();
        this.dataSub.unsubscribe();
    }

    onAdd() {
        this.orderStore.dispatch(new fromOrderActions.SetCurrent(null));
        this.router.navigate(['/orders/create']);
    }

    onEdit(index: number) {
        this.orderStore.dispatch(new fromOrderActions.SetCurrent(this.renderItems[index]));
        this.router.navigate(['/orders/create']);
    }

    onCheckout(index: number) {
        this.modalRef = this.modalService.open(CheckoutModalComponent, { centered: true } );
        this.modalRef.result.then((result) => {
            this.orderStore.dispatch(new fromOrderActions.Checkout({ orderId: this.renderItems[index].id, tipPercentage: result}));
        }, () => {
          // do nothing
        });
    }

    onDetails(index: number) {
        this.orderStore.dispatch(new fromOrderActions.SetCurrent(this.renderItems[index]));
        this.router.navigate(['/orders/details']);
    }
}

