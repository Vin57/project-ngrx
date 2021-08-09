import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PROFILE_ROUTES } from './profile.routes';
import { ProfileContainerComponent } from './components/profile-container.component';
import { LayoutModule } from 'src/app/shared/modules/layout.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [ProfileContainerComponent, ProfileComponent],
  imports: [RouterModule.forChild(PROFILE_ROUTES), LayoutModule],
})
export class ProfileModule {}
