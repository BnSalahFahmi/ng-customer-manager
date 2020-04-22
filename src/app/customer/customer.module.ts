import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerRoutingModule} from './customer-routing.module';
import {StoreModule} from '@ngrx/store';
import {reducer} from '../customer/store/customer.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CustomerEffects} from './store/customer.effects';

@NgModule({
  declarations: [CustomerRoutingModule.components],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    StoreModule.forFeature('selected-customer', reducer),
    EffectsModule.forFeature([CustomerEffects])
  ]
})
export class CustomerModule {
}
