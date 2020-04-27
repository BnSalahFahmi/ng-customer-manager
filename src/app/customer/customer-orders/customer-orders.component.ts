import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {CustomersService} from '../../core/services/customers.service';

@Component({
  selector: 'ng-cm-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  customer$: Observable<Customer>;
  loading$: Observable<boolean>;

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute) {
    this.loading$ = this.customersService.loading$;
  }

  ngOnInit(): void {
    const id = +this.route.parent.snapshot.paramMap.get('id');
    this.customer$ = this.customersService.getByKey(id);
  }

  totalOrder(customer: Customer) {
    return customer.orders.map(item => item.itemCost).reduce((a, b) => a + b);
  }
}
