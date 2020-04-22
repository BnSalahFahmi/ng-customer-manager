import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataService} from '../../core/services/data.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CoreActionTypes, LoadDataInfoFailure, LoadDataInfoSuccess} from './core.actions';
import {Action} from '@ngrx/store';

export {CoreActionTypes} from './core.actions';

@Injectable()
export class CoreEffects {

  constructor(private actions$: Actions,
              private dataService: DataService) {
  }

  LoadDataInfos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActionTypes.LOAD_DATA_INFO),
      switchMap(() => this.dataService.getDataInfos()),
      map(infos => LoadDataInfoSuccess({infos})),
      catchError((error: Error) => of(LoadDataInfoFailure({error})))
    ));
}
