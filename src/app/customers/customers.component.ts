import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as customersActions from './../customers/store/customers.actions';
import {selectCustomers, selectLoading} from './store/customers.selectors';

@Component({
  selector: 'ng-cm-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  title: string;
  filterText: string;
  displayMode: DisplayMode;
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;

  constructor(private store$: Store) {
  }

  ngOnInit(): void {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
    this.displayMode = 'CARD';
    this.store$.dispatch(customersActions.LoadCustomers());
    this.customers$ = this.store$.select(selectCustomers);
    this.loading$ = this.store$.select(selectLoading);
  }

  changeDisplayMode(displayMode) {
    this.displayMode = displayMode;
  }
}
