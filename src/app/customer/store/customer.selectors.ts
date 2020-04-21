import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CUSTOMER_FEATURE_KEY, State as CustomerState} from './customer.reducer';

export const getCustomerState = createFeatureSelector<CustomerState>(CUSTOMER_FEATURE_KEY);

export const selectCustomer = createSelector(
  getCustomerState,
  (state: CustomerState) => state ? state.customer : null
);

export const selectLoading = createSelector(
  getCustomerState,
  (state: CustomerState) => state ? state.loading : false
);

export const selectErrorMessage = createSelector(
  getCustomerState,
  (state: CustomerState) => state ? state.error : null
);
