import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectCustomersCount, selectOrdersCount} from '../store/core.selectors';
import {LoadDataInfo} from '../store/core.actions';

@Component({
  selector: 'ng-cm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginLogoutText = 'Login';
  nbCustomers$: Observable<number>;
  nbOrders$: Observable<number>;

  constructor(private store$: Store) {

  }

  ngOnInit(): void {
    this.store$.dispatch(LoadDataInfo());
    this.nbCustomers$ = this.store$.select(selectCustomersCount);
    this.nbOrders$ = this.store$.select(selectOrdersCount);
  }

}
