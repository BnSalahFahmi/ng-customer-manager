import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CustomersService} from '../core/services/customers.service';

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

  constructor(private customersService: CustomersService) {
    this.loading$ = this.customersService.loading$;
  }

  ngOnInit(): void {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
    this.displayMode = 'CARD';
    this.customers$ = this.customersService.getAll();
  }

  changeDisplayMode(displayMode) {
    this.displayMode = displayMode;
  }
}
