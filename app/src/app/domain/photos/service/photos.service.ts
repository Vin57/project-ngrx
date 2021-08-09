import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createApi } from 'unsplash-js';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import { IPhoto } from '../models/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private unsplash = createApi({
    accessKey: 'NKzV6YC0MoCMaJmngMrbvYH_uY-j5DABob2LvBYK5Xc',
  });
  constructor() {}

  public getPictures(filter: string): Observable<IPhoto[]> {
    return from(
      this.unsplash.search
        .getPhotos({ query: filter })
        .then((res) => res.response)
    ).pipe(
      map((res: Photos) => {
        return res.results.map((r) => ({ url: r.urls.small }));
      })
    );
  }
}
