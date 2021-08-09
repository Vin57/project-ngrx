import { IPhoto } from '../models/photo.interface';
import { PhotosActionEnum, PhotosActions } from './photos.actions';

export interface PhotoState {
  photos: IPhoto[];
  filter: string;
}

const photosStateInitial: PhotoState = {
  photos: [],
  filter: null,
};

export function photosReducer(
  state: PhotoState = photosStateInitial,
  action: PhotosActions
): PhotoState {
  switch (action.type) {
    case PhotosActionEnum.PHOTOS_SET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case PhotosActionEnum.PHOTOS_FETCH_SUCCESS: {
      return {
        ...state,
        photos: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
