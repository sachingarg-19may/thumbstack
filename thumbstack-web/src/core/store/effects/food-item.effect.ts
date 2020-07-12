import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FoodItemActionTypes } from '../Types';
import * as fromActions from '../actions/food-item.action';
import { FoodItemService } from '../../services/food-item.service';
import { BaseEffectService } from './base-effect.service';
import { Location } from '@angular/common';

@Injectable()
export class FoodItemEffects {
    constructor(private actions: Actions, private service: FoodItemService, 
        private baseEffects: BaseEffectService,
        private location: Location) {
    }

    @Effect()
    load$: Observable<Action> = this.actions
        .pipe(
        ofType(FoodItemActionTypes.LOAD),
        switchMap(() => {
            this.baseEffects.loadingService.show();
            return this.service.all()
                .pipe(
                    map(data => {
                        this.baseEffects.loadingService.hide();
                        return new fromActions.LoadComplete(data);
                    }),
                    catchError(error => this.showAlert(error, 'Failed to load food items'))
                );
        })
    );

    @Effect()
    add$: Observable<Action> = this.actions
        .pipe(
        ofType(FoodItemActionTypes.ADD),
        switchMap((action: fromActions.Add) => {
            this.baseEffects.loadingService.show();
            return this.service.add(action.payload)
                .pipe(
                    map(data => {
                        this.baseEffects.loadingService.hide();
                        this.baseEffects.showSuccessAlert('Food Item Added Successfully');
                        this.location.back();
                        return new fromActions.AddComplete();
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