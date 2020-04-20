import {Action, createReducer, on} from '@ngrx/store';
import * as customersActions from './customers.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export const CUSTOMER_FEATURE_KEY = 'customer';

export interface State extends EntityState<Customer> {
  loading: boolean;
  error?: Error | any;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
  selectId: item => item.id
});

export interface CustomerPartialState {
  readonly [CUSTOMER_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null
});

const customerReducer = createReducer(
  initialState,
  on(customersActions.LoadCustomers, state => {
    return ({...state, loading: true});
  }),
  on(customersActions.LoadCustomersSuccess, (state, {customers}) => {
    return adapter.addMany(customers, {
      ...state,
      loading: false
    });
  }),
  on(customersActions.LoadCustomersFailure, (state, error) => {
    return {...state, loading: false, error};
  })
);

export function reducer(state: State | undefined, action: Action) {
  return customerReducer(state, action);
}
