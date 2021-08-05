import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/layout/layout.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomepageComponent } from './domain/homepage/homepage.component';
import { SignupComponent } from './domain/authentication/components/signup/signup.component';
import { SigninComponent } from './domain/authentication/components/signin/signin.component';
import { TopbarComponent } from './domain/topbar/topbar.component';
import { UserInterceptor } from './domain/user/interceptors/user.interceptor';
import { ProfileComponent } from './domain/user/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupComponent,
    SigninComponent,
    TopbarComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(APP_ROUTES),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
