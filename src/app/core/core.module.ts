import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnceGuard} from './ensure-module-loaded-once.guard';
import {NavbarModule} from './navbar/navbar.module';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, NavbarModule],
  exports: [NavbarModule]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}
