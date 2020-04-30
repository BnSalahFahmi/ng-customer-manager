import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerRoutingModule} from './customer-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [CustomerRoutingModule.components],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule {
}
