import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';

@Injectable({providedIn: 'root'})
export class AppService extends EntityCollectionServiceBase<DataInfo> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('DataInfo', serviceElementsFactory);
  }

}
