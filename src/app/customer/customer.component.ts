import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomersService} from '../core/services/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  currentForm = 'existed-customer';

  constructor(private customersService: CustomersService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] === '#') {
      this.currentForm = 'new-customer';
    }
  }

}
