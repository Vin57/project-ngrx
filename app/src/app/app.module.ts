import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { CoreModule } from './shared/modules/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { reducers } from './shared/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { RouterStateSerialize } from './shared/store/models/router-state.serializer';
import { AuthenticationEffects } from './domain/authentication/store/authentication.effects';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthenticationEffects]),
    StoreDevtoolsModule.instrument({
      name: 'ngrx',
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: RouterStateSerialize,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
