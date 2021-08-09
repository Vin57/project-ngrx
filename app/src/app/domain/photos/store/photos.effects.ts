import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { debounceTime, map, switchMap, take, tap } from 'rxjs/operators';
import { RootState } from 'src/app/shared/store';
import { IPhoto } from '../models/photo.interface';
import { PhotosService } from '../service/photos.service';
import {
  PhotosActionEnum,
  PhotosActionFetch,
  PhotosActionFetchSuccess,
} from './photos.actions';
import { photosFilterSelector } from './photos.selectors';

@Injectable({ providedIn: 'root' })
export class PhotosEffects {
  public fetchPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosActionEnum.PHOTOS_FETCH),
      debounceTime(1000),
      switchMap((action: PhotosActionFetch) => {
        return this.store.pipe(select(photosFilterSelector), take(1));
      }),
      switchMap((filter: string) => this.photoService.getPictures(filter)),
      map((photos: IPhoto[]) => {
        return new PhotosActionFetchSuccess(photos);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private photoService: PhotosService
  ) {}
}
