import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';

@Injectable({providedIn: 'root'})
export class CustomersService extends EntityCollectionServiceBase<Customer> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Customer', serviceElementsFactory);
  }

}
