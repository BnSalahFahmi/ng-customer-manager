import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CustomersActionTypes, LoadCustomersFailure, LoadCustomersSuccess} from './customers.actions';
import {Action} from '@ngrx/store';

export {CustomersActionTypes} from './customers.actions';

@Injectable()
export class CustomersEffects {

  constructor(private actions$: Actions,
              private dataService: DataService,
              private router: Router) {
  }

  LoadCustomers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActionTypes.LOAD_CUSTOMERS),
      switchMap(() => this.dataService.getCustomers()),
      map(customers => LoadCustomersSuccess({customers})),
      catchError((error: Error) => of(LoadCustomersFailure({error})))
    ));
}
