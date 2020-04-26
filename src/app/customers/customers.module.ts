import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomersRoutingModule} from './customers-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [CustomersRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule {
}
