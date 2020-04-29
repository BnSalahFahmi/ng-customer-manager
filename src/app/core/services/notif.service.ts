import {Injectable} from '@angular/core';
import {SuccessNotifToast} from '../../shared/success-notif/success-notif.component';
import {ErrorNotifToast} from '../../shared/error-notif/error-notif.component';
import {GlobalConfig, ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';

@Injectable()
export class NotifService {

  options: GlobalConfig;

  constructor(private toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
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
