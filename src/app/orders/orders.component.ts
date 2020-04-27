import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CustomersService} from '../core/services/customers.service';

@Component({
  selector: 'ng-cm-customers-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  customers$: Observable<Customer[]>;

  constructor(private customersService: CustomersService) {
  }

  ngOnInit() {
    this.customers$ = this.customersService.getAll();
  }

}
