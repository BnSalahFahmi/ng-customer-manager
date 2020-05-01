import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnceGuard} from '../../core/guards/ensure-module-loaded-once.guard';
import {LoaderComponent} from './loader.component';

@NgModule({
  imports: [CommonModule],
  exports: [LoaderComponent],
  declarations: [LoaderComponent]
})
export class LoaderModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: LoaderModule) {
    super(parentModule);
  }

}
