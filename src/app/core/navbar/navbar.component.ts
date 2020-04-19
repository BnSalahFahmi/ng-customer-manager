import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCustomersCount} from '../../customers/store/customers.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'ng-cm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginLogoutText = 'Login';
  nbCustomers$: Observable<number>;

  constructor(private store$: Store) {

  }

  ngOnInit(): void {
    this.nbCustomers$ = this.store$.select(selectCustomersCount);
  }

}
