import {Component, OnInit} from '@angular/core';
import {AppService} from '../services/app.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ng-cm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginLogoutText = 'Login';
  nbCustomers: number;
  nbOrders: number;

  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.appService.getAll().pipe(
      map(data => data[0]),
    ).subscribe(
      data => {
        this.nbCustomers = data.customersCount;
        this.nbOrders = data.ordersCount;
      }
    );
  }

}
