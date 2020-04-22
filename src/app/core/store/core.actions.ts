import {createAction, props} from '@ngrx/store';

export enum CoreActionTypes {
  LOAD_DATA_INFO = '[Core] Load Data Info',
  LOAD_DATA_INFO_SUCCESS = '[Core] Load Data Info Success',
  LOAD_DATA_INFO_FAILURE = '[Core] Load Data Info Failure'
}

export const LoadDataInfo = createAction(
  CoreActionTypes.LOAD_DATA_INFO
);

export const LoadDataInfoSuccess = createAction(
  CoreActionTypes.LOAD_DATA_INFO_SUCCESS,
  props<{ infos: DataInfo }>()
);

export const LoadDataInfoFailure = createAction(
  CoreActionTypes.LOAD_DATA_INFO_FAILURE,
  props<{ error: Error }>()
);
