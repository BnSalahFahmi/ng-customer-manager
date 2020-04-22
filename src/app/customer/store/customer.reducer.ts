import {Action, createReducer, on} from '@ngrx/store';
import * as customerActions from './customer.actions';

export const CUSTOMER_FEATURE_KEY = 'selected-customer';

export interface State {
  customer: Customer;
  loading: boolean;
  error?: Error | any;
}

export const initialState: State = {
  customer: null,
  loading: false,
  error: null
};

const customerReducer = createReducer(
  initialState,
  on(customerActions.LoadCustomer, state => {
    return ({...state, loading: true});
  }),
  on(customerActions.LoadCustomerSuccess, (state, {customer}) => {
    return ({...state, customer: customer, loading: false});
  }),
  on(customerActions.LoadCustomerFailure, (state, error) => {
    return {...state, loading: false, error};
  })
);

export function reducer(state: State | undefined, action: Action) {
  return customerReducer(state, action);
}
