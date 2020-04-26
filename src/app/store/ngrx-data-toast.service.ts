import {Injectable} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {EntityAction, EntityCacheAction, ofEntityOp, OP_ERROR, OP_SUCCESS} from '@ngrx/data';
import {filter} from 'rxjs/operators';
import {GlobalConfig, ToastrService} from 'ngx-toastr';
import {SuccessNotifToast} from '../shared/success-notif/success-notif.component';
import {ErrorNotifToast} from '../shared/error-notif/error-notif.component';
import * as _ from 'lodash';

@Injectable({providedIn: 'root'})
export class NgrxDataToastService {

  options: GlobalConfig;

  constructor(private actions$: Actions, private toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
    actions$.pipe(
      ofEntityOp(),
      filter(
        (ea: EntityAction) =>
          ea.payload.entityOp.endsWith(OP_SUCCESS) ||
          ea.payload.entityOp.endsWith(OP_ERROR)
      )
    )
      .subscribe(action =>
        this.openSuccessNotif(`${action.payload.entityName} action`)
      );

    actions$
      .pipe(
        ofType(
          EntityCacheAction.SAVE_ENTITIES_SUCCESS,
          EntityCacheAction.SAVE_ENTITIES_ERROR
        )
      )
      .subscribe((action: any) =>
        this.openSuccessNotif(`${action.type} - url: ${action.payload.url}`)
      );
  }

  openSuccessNotif(message) {
    const opt = _.cloneDeep(this.options);
    opt.toastComponent = SuccessNotifToast;
    opt.toastClass = 'notyf confirm';
    const inserted = this.toastrService.show(message || 'Success', '', opt);
    return inserted;
  }

  openErrorNotif(message) {
    const opt = _.cloneDeep(this.options);
    opt.toastComponent = ErrorNotifToast;
    opt.toastClass = 'notyf confirm';
    const inserted = this.toastrService.show(message || 'Error', '', opt);
    return inserted;
  }
}
