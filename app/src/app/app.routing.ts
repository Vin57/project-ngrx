import { Routes } from '@angular/router';
import { SigninComponent } from './domain/authentication/components/signin/signin.component';
import { SignupComponent } from './domain/authentication/components/signup/signup.component';
import { HomepageComponent } from './domain/homepage/homepage.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile',
    loadChildren: () =>
      import('./domain/profile/modules/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
];
