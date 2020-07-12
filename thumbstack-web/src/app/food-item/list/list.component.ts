import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromFoodStore from 'src/core/store/reducers/food-item.reducer';
import * as fromFoodActions from 'src/core/store/actions/food-item.action';
import { FoodItemModel } from 'src/core/models/food-item.models';

@Component({
  selector: 'app-food-item',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    refreshSub: Subscription;
    foodItems: FoodItemModel[] = [];
    dataSub: Subscription;
    constructor(private foodItemStore: Store<fromFoodStore.FoodItemState>) {
    }

    ngOnInit() {
        this.foodItemStore.dispatch(new fromFoodActions.Load());

        this.refreshSub = this.foodItemStore.select(fromFoodStore.getRefresh).subscribe(refresh => {
            if (refresh) {
                this.foodItemStore.dispatch(new fromFoodActions.Load());
            } 
        });

        this.dataSub = this.foodItemStore.select(fromFoodStore.getAll).subscribe(data => {
            if (data) {
                console.log(data);
                this.foodItems = data;
            } 
        });
    }

    ngOnDestroy(): void {
        this.refreshSub.unsubscribe();
        this.dataSub.unsubscribe();
    }
}

