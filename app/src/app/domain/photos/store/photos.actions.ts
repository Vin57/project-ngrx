import { Action } from '@ngrx/store';
import { IPhoto } from '../models/photo.interface';

export enum PhotosActionEnum {
  // PHOTOS
  PHOTOS_FETCH = '[photos] fetch',
  PHOTOS_FETCH_SUCCESS = '[photos] fetch success',
  // PHOTOS_FILTER
  PHOTOS_SET_FILTER = '[photos] set filter',
}

/*********************************
 * PHOTOS
 *********************************/

export class PhotosActionFetch implements Action {
  readonly type: string = PhotosActionEnum.PHOTOS_FETCH;

  constructor(public payload?: any) {}
}

export class PhotosActionFetchSuccess implements Action {
  readonly type: string = PhotosActionEnum.PHOTOS_FETCH_SUCCESS;

  constructor(public payload: IPhoto[]) {}
}

/*********************************
 * PHOTOS_FILTER
 *********************************/

export class PhotosActionSetFilter implements Action {
  readonly type: string = PhotosActionEnum.PHOTOS_SET_FILTER;

  constructor(public payload: string) {}
}

export type PhotosActions =
  | PhotosActionFetch
  | PhotosActionFetchSuccess
  | PhotosActionSetFilter;
