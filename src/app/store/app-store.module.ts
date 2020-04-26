import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';

import {DefaultDataServiceConfig, EntityDataModule} from '@ngrx/data';
import {entityConfig} from './entity-metadata';
import {NgrxDataToastService} from './ngrx-data-toast.service';

const baseUrl = environment.apiUrlBase + '/';
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrlBase + '/',
  entityHttpResourceUrls: {
    Customer: {
      entityResourceUrl: baseUrl + 'customers/',
      collectionResourceUrl: baseUrl + 'customers/'
    },
    Order: {
      entityResourceUrl: baseUrl + 'orders/',
      collectionResourceUrl: baseUrl + 'orders/'
    },
    DataInfo: {
      entityResourceUrl: baseUrl + 'dataInfos/',
      collectionResourceUrl: baseUrl + 'dataInfos/'
    }
  }
};

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [{provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig}]
})
export class AppStoreModule {
  constructor(toastService: NgrxDataToastService) {
  }
}
