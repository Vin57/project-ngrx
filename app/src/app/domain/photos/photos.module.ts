import { NgModule } from '@angular/core';
import { PhotosComponent } from './photos.component';
import { LayoutModule } from 'src/app/shared/modules/layout.module';
import { RouterModule } from '@angular/router';
import { PHOTOS_ROUTES } from './photos.routes';
import { StoreModule } from '@ngrx/store';
import { photosReducer } from './store/photos.reducers';
import { STORE_ENTRY_PHOTOS } from 'src/app/shared/store/entries';
import { EffectsModule } from '@ngrx/effects';
import { PhotosEffects } from './store/photos.effects';

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    LayoutModule,
    RouterModule.forChild(PHOTOS_ROUTES),
    StoreModule.forFeature(STORE_ENTRY_PHOTOS, photosReducer),
    EffectsModule.forFeature([PhotosEffects]),
  ],
})
export class PhotosModule {}
