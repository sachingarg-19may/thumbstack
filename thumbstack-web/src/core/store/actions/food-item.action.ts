import { Action } from '@ngrx/store';
import { FoodItemActionTypes } from '../Types';
import { FoodItemModel } from '../../models/food-item.models';

export class Reset implements Action {
    readonly type = FoodItemActionTypes.RESET;
    constructor() {}
}

export class ApiError implements Action {
    readonly type = FoodItemActionTypes.API_ERROR;
    constructor(public payload: any) {}
}

export class ResetError implements Action {
    readonly type = FoodItemActionTypes.RESET_ERROR;
    constructor() {}
}

export class ApiSuccess implements Action {
    readonly type = FoodItemActionTypes.API_SUCCESS;
    constructor() {}
}

export class Load implements Action {
    readonly type = FoodItemActionTypes.LOAD;
    constructor() {}
}

export class LoadComplete implements Action {
    readonly type = FoodItemActionTypes.LOAD_SUCCESS;
    constructor(public payload: FoodItemModel[]) {}
}

export class Add implements Action {
    readonly type = FoodItemActionTypes.ADD;
    constructor(public payload: FoodItemModel) {}
}

export class AddComplete implements Action {
    readonly type = FoodItemActionTypes.ADD_COMPLETE;
    constructor() {}
}

export type FoodItemActions = Reset | ApiError | ApiSuccess | ResetError | 
Load | LoadComplete | Add | AddComplete;