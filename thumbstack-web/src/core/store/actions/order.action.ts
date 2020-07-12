import { Action } from '@ngrx/store';
import { OrderActionTypes } from '../Types';
import { OrderModel, AddUpdateOderModel, CheckOutModel } from '../../models/order.models';

export class Reset implements Action {
    readonly type = OrderActionTypes.RESET;
    constructor() {}
}

export class ApiError implements Action {
    readonly type = OrderActionTypes.API_ERROR;
    constructor(public payload: any) {}
}

export class ResetError implements Action {
    readonly type = OrderActionTypes.RESET_ERROR;
    constructor() {}
}

export class ApiSuccess implements Action {
    readonly type = OrderActionTypes.API_SUCCESS;
    constructor() {}
}

export class Load implements Action {
    readonly type = OrderActionTypes.LOAD;
    constructor() {}
}

export class LoadComplete implements Action {
    readonly type = OrderActionTypes.LOAD_SUCCESS;
    constructor(public payload: OrderModel[]) {}
}

export class Add implements Action {
    readonly type = OrderActionTypes.ADD;
    constructor(public payload: AddUpdateOderModel) {}
}

export class Update implements Action {
    readonly type = OrderActionTypes.UPDATE;
    constructor(public payload: { id: number, data: AddUpdateOderModel }) {}
}

export class Checkout implements Action {
    readonly type = OrderActionTypes.CHECKOUT;
    constructor(public payload: CheckOutModel) {}
}

export class UpdateComplete implements Action {
    readonly type = OrderActionTypes.UPDATE_COMPLETE;
    constructor(public payload: OrderModel) {}
}

export class SetCurrent implements Action {
    readonly type = OrderActionTypes.SET_CURRENT;
    constructor(public payload: OrderModel) {}
}

export type OrderActions = Reset | ApiError | ApiSuccess | ResetError | 
Load | LoadComplete | Add | Update | Checkout | UpdateComplete | SetCurrent;