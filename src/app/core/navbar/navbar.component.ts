import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../services/app.service';
import {map} from 'rxjs/operators';
import {DataService} from '../services/data.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'ng-cm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  loginLogoutText = 'Login';
  nbCustomers: number;
  nbOrders: number;
  subs = new SubSink();

  constructor(private appService: AppService, private dataService: DataService) {
    this.subs.sink = this.dataService.refreshData.asObservable().subscribe(
      refresh => {
        this.getData();
      }
    );
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.appService.getAll().pipe(
      map(data => data[0])
    ).subscribe(
      data => {
        this.nbCustomers = data.customersCount;
        this.nbOrders = data.ordersCount;
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
