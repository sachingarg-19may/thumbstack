import { OrderActionTypes } from '../Types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderActions } from '../actions/order.action';
import { FoodItemModel } from '../../models/food-item.models';
import { OrderModel } from '../../models/order.models';
 
export interface OrderState {
    all: OrderModel[];
    current: OrderModel;
    error: any;
    refresh: boolean;
}

const initialState: OrderState = {
    all: [],
    current: null,
    error: null,
    refresh: false
};
 
export function orderReducer(state = initialState, action: OrderActions) {
  switch (action.type) {
    case OrderActionTypes.RESET:
      return initialState;
    case OrderActionTypes.API_ERROR:
      return { ...state, error: action.payload };
    case OrderActionTypes.RESET_ERROR:
      return { ...state, error: null, refresh: false };
    case OrderActionTypes.API_SUCCESS:
      return { ...state, error: null, refresh: true };  
    case OrderActionTypes.LOAD:
    case OrderActionTypes.ADD:
    case OrderActionTypes.UPDATE:
    case OrderActionTypes.CHECKOUT:
      return { ...state, refresh: false };
    case OrderActionTypes.LOAD_SUCCESS:
      return { ...state, refresh: false, all: action.payload };
    case OrderActionTypes.UPDATE_COMPLETE: {
      var newAll = [ ...state.all ];
      var index = newAll.findIndex(c => c.id === action.payload.id);
      if (index >= 0) {
        newAll[index] = { ...action.payload };
      } else {
        newAll.push(action.payload);
      }
      return { ...state, current: action.payload, all: newAll };
    }
    case OrderActionTypes.SET_CURRENT:
      return { ...state, current: action.payload };
      
    default:
      return state;
  }
}

export const getUserState = createFeatureSelector<OrderState>('order');

export const getAll = createSelector(
  getUserState,
  (state: OrderState) => state.all
);

export const getCurrent = createSelector(
  getUserState,
  (state: OrderState) => state.current
);

export const getRefresh = createSelector(
  getUserState,
  (state: OrderState) => state.refresh
);
