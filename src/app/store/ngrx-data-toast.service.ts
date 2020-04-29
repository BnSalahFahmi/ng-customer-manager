import {Injectable} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {EntityAction, EntityCacheAction, ofEntityOp, OP_ERROR, OP_SUCCESS} from '@ngrx/data';
import {filter} from 'rxjs/operators';
import {NotifService} from '../core/services/notif.service';

@Injectable({providedIn: 'root'})
export class NgrxDataToastService {

  constructor(private actions$: Actions, private notifService: NotifService) {
    actions$.pipe(
      ofEntityOp(),
      filter(
        (ea: EntityAction) =>
          ea.payload.entityOp.endsWith(OP_SUCCESS) ||
          ea.payload.entityOp.endsWith(OP_ERROR)
      )
    )
      .subscribe(action =>
        //this.notifService.openSuccessNotif(`${action.payload.entityName} action`)
        console.log(action.payload)
      );

    actions$
      .pipe(
        ofType(
          EntityCacheAction.SAVE_ENTITIES_SUCCESS,
          EntityCacheAction.SAVE_ENTITIES_ERROR
        )
      )
      .subscribe((action: any) =>
        //this.notifService.openSuccessNotif(`${action.type} - url: ${action.payload.url}`)
        console.log(action.payload)
      );
  }
}
