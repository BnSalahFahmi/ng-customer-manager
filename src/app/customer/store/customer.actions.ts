import {createAction, props} from '@ngrx/store';

export enum CustomerActionTypes {
  LOAD_CUSTOMER = '[Customer] Load Customer',
  LOAD_CUSTOMER_SUCCESS = '[Customer] Load Customer Success',
  LOAD_CUSTOMER_FAILURE = '[Customer] Load Customer Failure'
}

export const LoadCustomer = createAction(
  CustomerActionTypes.LOAD_CUSTOMER,
  props<{ customerId: number }>()
);

export const LoadCustomerSuccess = createAction(
  CustomerActionTypes.LOAD_CUSTOMER_SUCCESS,
  props<{ customer: Customer }>()
);

export const LoadCustomerFailure = createAction(
  CustomerActionTypes.LOAD_CUSTOMER_FAILURE,
  props<{ error: Error }>()
);
