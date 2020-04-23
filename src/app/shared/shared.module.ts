import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedRoutingModule} from './shared-routing.module';
import {AnimationsService} from './animations/animations.service';
import {LoaderComponent} from './loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    AnimationsService
  ]
})
export class SharedModule {
}
