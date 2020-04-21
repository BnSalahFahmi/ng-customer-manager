import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CustomerActionTypes, LoadCustomerFailure, LoadCustomerSuccess} from './customer.actions';
import {Action} from '@ngrx/store';

export {CustomerActionTypes} from './customer.actions';

@Injectable()
export class CustomerEffects {

  constructor(private actions$: Actions,
              private dataService: DataService,
              private router: Router) {
  }

  LoadCustomer$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActionTypes.LOAD_CUSTOMER),
      map(payload => (payload as any).customerId),
      switchMap((id) => this.dataService.getCustomer(id)),
      map(customer => LoadCustomerSuccess({customer})),
      catchError((error: Error) => of(LoadCustomerFailure({error})))
    ));
}
