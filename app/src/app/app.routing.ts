import { Routes } from '@angular/router';
import { SigninComponent } from './domain/authentication/components/signin/signin.component';
import { SignupComponent } from './domain/authentication/components/signup/signup.component';
import { AuthGuard } from './domain/authentication/guards/auth.guard';
import { HomepageComponent } from './domain/homepage/homepage.component';
import { ProfileComponent } from './domain/user/profile.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
];
