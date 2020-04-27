import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {EnsureModuleLoadedOnceGuard} from '../guards/ensure-module-loaded-once.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: []
})
export class NavbarModule extends EnsureModuleLoadedOnceGuard {

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: NavbarModule) {
    super(parentModule);
  }
}
