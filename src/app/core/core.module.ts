import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnceGuard} from './guards/ensure-module-loaded-once.guard';
import {NavbarModule} from './navbar/navbar.module';
import {RouterModule} from '@angular/router';
import {DataService} from './services/data.service';
import {HttpClientModule} from '@angular/common/http';
import {NotifService} from './services/notif.service';
import {ModalModule} from './modal/modal.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    ModalModule,
    HttpClientModule
  ],
  exports: [
    ModalModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    NotifService,
    {provide: 'Window', useFactory: () => window}
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}
