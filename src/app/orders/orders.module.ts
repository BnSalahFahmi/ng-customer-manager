import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {OrdersRoutingModule} from './orders-routing.module';
import {CommonModule} from '@angular/common';
import {OrderItemComponent} from './order-item/order-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule
  ],
  declarations: [OrdersRoutingModule.components, OrderItemComponent]
})
export class OrdersModule {
}
