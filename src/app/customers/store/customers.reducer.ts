import {Action, createReducer, on} from '@ngrx/store';
import * as customersActions from './customers.actions';

export interface State {
  customers: Customer[];
  loading: boolean;
  error: Error;
}

export const initialState: State = {
  customers: [],
  loading: false,
  error: null
};


const customersReducer = createReducer(
  initialState,
  on(customersActions.LoadCustomers, state => {
    return ({...state, loading: true});
  }),
  on(customersActions.LoadCustomersSuccess, (state, {customers}) => {
    return ({...state, customers: customers, loading: false});
  }),
  on(customersActions.LoadCustomersFailure, (state, error) => {
    return {...state, loading: false, error: error.error};
  })
);

export function reducer(state: State | undefined, action: Action) {
  return customersReducer(state, action);
}

export const getCustomers = (state: State) => state.customers;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
