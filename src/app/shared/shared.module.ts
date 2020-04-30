import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedRoutingModule} from './shared-routing.module';
import {AnimationsService} from './animations/animations.service';
import {LoaderComponent} from './loader/loader.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { TotalOrderPipe } from './pipes/total-order.pipe';

@NgModule({
  declarations: [LoaderComponent, CapitalizePipe, TotalOrderPipe],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxPaginationModule
  ],
  exports: [
    LoaderComponent,
    TotalOrderPipe,
    NgxPaginationModule
  ],
  providers: [
    AnimationsService
  ]
})
export class SharedModule {
}
