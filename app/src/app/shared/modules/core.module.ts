import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from 'src/app/domain/user/interceptors/user.interceptor';
import { SigninComponent } from 'src/app/domain/authentication/components/signin/signin.component';
import { SignupComponent } from 'src/app/domain/authentication/components/signup/signup.component';
import { TopbarComponent } from 'src/app/domain/topbar/topbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [SignupComponent, SigninComponent, TopbarComponent];

const IMPORTS = [
  ReactiveFormsModule,
  HttpClientModule,
  LayoutModule,
  RouterModule,
];

@NgModule({
  declarations: COMPONENTS,
  imports: IMPORTS,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true,
    },
  ],
  exports: [...COMPONENTS, ...IMPORTS],
})
export class CoreModule {}
