import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CustomersService} from '../core/services/customers.service';
import {NotifService} from '../core/services/notif.service';
import {AppService} from '../core/services/app.service';

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

  constructor(
    private customersService: CustomersService,
    private notifService: NotifService,
    private appService: AppService) {
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

  onDeleteCustomer(customerId) {
    this.customersService.delete(customerId).subscribe(
      data => {
        this.notifService.openSuccessNotif('Customer Deleted Successfully');
        this.customersService.getAll();
        this.appService.getAll();
      }
    );
  }
}
