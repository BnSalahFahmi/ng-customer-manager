import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CustomersService} from '../core/services/customers.service';
import {NotifService} from '../core/services/notif.service';
import {DataService} from '../core/services/data.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'ng-cm-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {

  title: string;
  filterText: string;
  displayMode: DisplayMode;
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;
  subs = new SubSink();

  constructor(
    private customersService: CustomersService,
    private dataService: DataService,
    private notifService: NotifService) {
    this.loading$ = this.customersService.loading$;
    this.subs.sink = this.dataService.refreshData.asObservable().subscribe(
      refresh => {
        if (refresh) {
          this.customers$ = this.customersService.getAll();
        }
      }
    );
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
        this.dataService.refreshData.next(true);
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
