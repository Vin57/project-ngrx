import { Routes } from '@angular/router';
import { SigninComponent } from './domain/authentication/components/signin/signin.component';
import { SignupComponent } from './domain/authentication/components/signup/signup.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'photos', pathMatch: 'full' },

  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'photos',
    loadChildren: () =>
      import('./domain/photos/photos.module').then((m) => m.PhotosModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./domain/profile/profile.module').then((m) => m.ProfileModule),
  },
];
