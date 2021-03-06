import { Routes } from '@angular/router';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { ProfileContainerComponent } from './components/profile-container.component';
import { ProfileComponent } from './components/profile/profile.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileContainerComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
    ],
  },
];
