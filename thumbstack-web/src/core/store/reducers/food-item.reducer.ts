import { FoodItemActionTypes } from '../Types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoodItemActions } from '../actions/food-item.action';
import { FoodItemModel } from '../../models/food-item.models';
 
export interface FoodItemState {
    all: FoodItemModel[];
    error: any;
    refresh: boolean;
}

const initialState: FoodItemState = {
    all: [],
    error: null,
    refresh: false
};
 
export function foodItemReducer(state = initialState, action: FoodItemActions) {
  switch (action.type) {
    case FoodItemActionTypes.RESET:
      return initialState;
    case FoodItemActionTypes.API_ERROR:
      return { ...state, error: action.payload };
    case FoodItemActionTypes.RESET_ERROR:
      return { ...state, error: null, refresh: false };
    case FoodItemActionTypes.API_SUCCESS:
      return { ...state, error: null, refresh: true };  
    case FoodItemActionTypes.LOAD:
    case FoodItemActionTypes.ADD:
      return { ...state, refresh: false };
    case FoodItemActionTypes.LOAD_SUCCESS:
      return { ...state, refresh: false, all: action.payload };
    case FoodItemActionTypes.ADD_COMPLETE: 
      return { ...state, refresh: true };
    default:
      return state;
  }
}

export const getUserState = createFeatureSelector<FoodItemState>('food-item');

export const getAll = createSelector(
  getUserState,
  (state: FoodItemState) => state.all
);

export const getRefresh = createSelector(
  getUserState,
  (state: FoodItemState) => state.refresh
);
