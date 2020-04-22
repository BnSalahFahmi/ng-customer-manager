import {Action, createReducer, on} from '@ngrx/store';
import * as coreActions from './core.actions';

export interface State {
  customersCount: number;
  ordersCount: number;
  loading: boolean;
}

export const initialState: State = {
  customersCount: 0,
  ordersCount: 0,
  loading: false
};

const coreReducer = createReducer(
  initialState,
  on(coreActions.LoadDataInfo, state => {
    return ({...state, loading: true});
  }),
  on(coreActions.LoadDataInfoSuccess, (state, {infos}) => {
    return {
      ...state,
      customersCount: infos.customersCount,
      ordersCount: infos.ordersCount,
      loading: false
    };
  }),
  on(coreActions.LoadDataInfoFailure, (state, error) => {
    return {...state, loading: false, error};
  })
);

export function reducer(state: State | undefined, action: Action) {
  return coreReducer(state, action);
}
