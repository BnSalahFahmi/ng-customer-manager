import {State as AppState} from './index';

export const selectCustomersCount = (state: AppState) => state ? state.global.customersCount : 0;
export const selectOrdersCount = (state: AppState) => state ? state.global.ordersCount : 0;

