import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectCustomer} from '../store/customer.selectors';

@Component({
  selector: 'ng-cm-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customer$: Observable<Customer>;

  constructor(private store$: Store) {
  }

  ngOnInit(): void {
    this.customer$ = this.store$.select(selectCustomer);
  }

}
