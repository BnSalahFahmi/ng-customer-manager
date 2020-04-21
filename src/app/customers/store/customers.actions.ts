import {createAction, props} from '@ngrx/store';

export enum CustomersActionTypes {
  LOAD_CUSTOMERS = '[Customers] Load Customers',
  LOAD_CUSTOMERS_SUCCESS = '[Customers] Load Customers Success',
  LOAD_CUSTOMERS_FAILURE = '[Customers] Load Customers Failure',
}

export const LoadCustomers = createAction(
  CustomersActionTypes.LOAD_CUSTOMERS
);

export const LoadCustomersSuccess = createAction(
  CustomersActionTypes.LOAD_CUSTOMERS_SUCCESS,
  props<{ customers: Customer[] }>()
);

export const LoadCustomersFailure = createAction(
  CustomersActionTypes.LOAD_CUSTOMERS_FAILURE,
  props<{ error: Error }>()
);
