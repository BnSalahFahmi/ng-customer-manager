import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedRoutingModule} from './shared-routing.module';
import {AnimationsService} from './animations/animations.service';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {TotalOrderPipe} from './pipes/total-order.pipe';
import {LoaderModule} from './loader/loader.module';

@NgModule({
  declarations: [CapitalizePipe, TotalOrderPipe],
  imports: [
    CommonModule,
    LoaderModule,
    SharedRoutingModule,
    NgxPaginationModule
  ],
  exports: [
    NgxPaginationModule,
    LoaderModule,
    CapitalizePipe,
    TotalOrderPipe
  ],
  providers: [
    AnimationsService
  ]
})
export class SharedModule {
}
