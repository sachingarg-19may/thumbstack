import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { OrderActionTypes } from '../Types';
import * as fromActions from '../actions/order.action';
import { BaseEffectService } from './base-effect.service';
import { Location } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Injectable()
export class OrderEffects {
    constructor(private actions: Actions, private service: OrderService, 
        private baseEffects: BaseEffectService,
        private location: Location) {
    }

    @Effect()
    load$: Observable<Action> = this.actions
        .pipe(
        ofType(OrderActionTypes.LOAD),
        switchMap(() => {
            this.baseEffects.loadingService.show();
            return this.service.all()
                .pipe(
                    map(data => {
                        this.baseEffects.loadingService.hide();
                        return new fromActions.LoadComplete(data);
                    }),
                    catchError(error => this.showAlert(error, 'Failed to load food orders'))
                );
        })
    );

    @Effect()
    add$: Observable<Action> = this.actions
        .pipe(
        ofType(OrderActionTypes.ADD),
        switchMap((action: fromActions.Add) => {
            this.baseEffects.loadingService.show();
            return this.service.add(action.payload)
                .pipe(
                    map(data => {
                        this.baseEffects.loadingService.hide();
                        this.baseEffects.showSuccessAlert('Order Added Successfully');
                        this.location.back();
                        return new fromActions.UpdateComplete(data);
                    }),
                    catchError(error => this.setError(error))
                );            
        })
    );

    @Effect()
    update$: Observable<Action> = this.actions
        .pipe(
        ofType(OrderActionTypes.UPDATE),
        switchMap((action: fromActions.Update) => {
            this.baseEffects.loadingService.show();
            return this.service.update(action.payload.id, action.payload.data)
                .pipe(
                    map(data => {
                        this.baseEffects.loadingService.hide();
                        this.baseEffects.showSuccessAlert('Order Updated Successfully');
                        this.location.back();
                        return new fromActions.UpdateComplete(data);
                    }),
                    catchError(error => this.setError(error))
                );            
        })
    );

    @Effect()
    checkout$: Observable<Action> = this.actions
        .pipe(
        ofType(OrderActionTypes.CHECKOUT),
        switchMap((action: fromActions.Checkout) => {
            this.baseEffects.loadingService.show();
            return this.service.checkout(action.payload)
                .pipe(
                    map(data => {
                        this.baseEffects.loadingService.hide();
                        this.baseEffects.showSuccessAlert('Order Checkout Successfully');
                        return new fromActions.UpdateComplete(data);
                    }),
                    catchError(error => this.setError(error))
                );            
        })
    );

    private showAlert(error: any, message: string) {
        this.baseEffects.showErrorAlert(error, message); 
        return observableOf(new fromActions.ApiError(null));
    }

    private setError(error: any) {
        this.baseEffects.loadingService.hide();
        return observableOf(new fromActions.ApiError(error));
    }
}