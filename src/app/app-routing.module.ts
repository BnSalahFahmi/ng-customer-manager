import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PreloadModulesStrategy} from './core/strategies/preload-modules.strategy';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/customers'},
  {path: 'customers/:id', data: {preload: true}, loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  {path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)},
  {path: '**', pathMatch: 'full', redirectTo: '/customers'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, /* enableTracing: true */ }) ],
  exports: [RouterModule],
  providers: [PreloadModulesStrategy]
})
export class AppRoutingModule {
}
