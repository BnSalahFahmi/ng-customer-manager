import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './customers.component';
import {CustomersGridComponent} from './customers-grid/customers-grid.component';
import {CustomersCardComponent} from './customers-card/customers-card.component';

const routes: Routes = [
  {path: '', component: CustomersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {
  static components = [ CustomersComponent, CustomersGridComponent, CustomersCardComponent ];
}
