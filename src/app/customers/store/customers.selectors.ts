import {createFeatureSelector, createSelector} from '@ngrx/store';

import {State as CustomersState} from './customers.reducer';

export const getCustomersState = createFeatureSelector<CustomersState>('Customers');

export const selectCustomers = createSelector(
  getCustomersState,
  (state: CustomersState) => state ? state.customers : []
);

export const selectCustomersCount = createSelector(
  getCustomersState,
  (state: CustomersState) => state ? state.customers.length : 0
);

export const selectLoading = createSelector(
  getCustomersState,
  (state: CustomersState) => state ? state.loading : false
);

export const selectErrorMessage = createSelector(
  getCustomersState,
  (state: CustomersState) => state ? state.error : null
);
