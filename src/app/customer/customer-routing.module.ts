import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {CustomerOrdersComponent} from './customer-orders/customer-orders.component';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {CustomerMapComponent} from './customer-map/customer-map.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'details',
        component: CustomerDetailsComponent
      },
      {
        path: 'orders',
        component: CustomerOrdersComponent
      },
      {
        path: 'new-customer',
        component: CustomerEditComponent
      },
      {
        path: 'edit',
        component: CustomerEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
  static components = [CustomerComponent, CustomerOrdersComponent, CustomerDetailsComponent, CustomerMapComponent, CustomerEditComponent];
}
