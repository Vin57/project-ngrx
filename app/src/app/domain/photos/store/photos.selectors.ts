import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORE_ENTRY_PHOTOS } from 'src/app/shared/store/entries';
import { PhotoState } from './photos.reducers';

const photosSelector = createFeatureSelector(STORE_ENTRY_PHOTOS);

export const photosFilterSelector = createSelector(
  photosSelector,
  (photoState: PhotoState) => photoState.filter
);
export const photosPictureSelector = createSelector(
  photosSelector,
  (photoState: PhotoState) => photoState.photos
);
