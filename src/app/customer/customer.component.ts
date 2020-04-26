import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../shared/animations/route.animations';
import {CustomersService} from '../core/services/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(private customersService: CustomersService, private route: ActivatedRoute) {

  }

}
