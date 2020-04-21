import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnceGuard} from './guards/ensure-module-loaded-once.guard';
import {NavbarModule} from './navbar/navbar.module';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {DataService} from './services/data.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, NavbarModule, HttpClientModule],
  exports: [NavbarModule, HttpClientModule],
  providers: [DataService,
    { provide: 'Window', useFactory: () => window }]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}
