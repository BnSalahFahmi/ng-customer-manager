import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectCustomer} from '../store/customer.selectors';

@Component({
  selector: 'ng-cm-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  customer$: Observable<Customer>;

  constructor(private store$: Store) {
  }

  ngOnInit(): void {
    this.customer$ = this.store$.select(selectCustomer);
  }

}
