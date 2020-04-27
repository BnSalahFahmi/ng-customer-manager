import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {OrdersRoutingModule} from './orders-routing.module';
import {CommonModule} from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';
import { OrderItemComponent } from './order-item/order-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    AgGridModule.withComponents([])],
  declarations: [OrdersRoutingModule.components, OrderItemComponent]
})
export class OrdersModule {
}
