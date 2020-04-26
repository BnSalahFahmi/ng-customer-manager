import {EntityMetadataMap} from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  DataInfo: {},
  Customer: {
    /*additionalCollectionState: {
      customersCount: {}
    }*/
  },
  Order: {}
};

const pluralNames = {};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
