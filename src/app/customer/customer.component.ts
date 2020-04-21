import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {LoadCustomer} from './store/customer.actions';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customer$: Observable<Customer>;

  constructor(private store$: Store, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.store$.dispatch(LoadCustomer({customerId: id}));
      }
    });
  }


}
