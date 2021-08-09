import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService, JWT_LOCALE_KEY } from '../services/auth.service';
import {
  AuthenticationActionEnum,
  AuthenticationLogout,
  AuthenticationSignin,
  AuthenticationSigninError,
  AuthenticationSigninSuccess,
  AuthenticationSignup,
  AuthenticationSignupError,
  AuthenticationSignupSuccess,
} from './authentication.actions';
import { Credential } from './models/credential.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationEffects {
  private subscriptionRefreshToken: Subscription;

  public storeInit$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<AuthenticationSignin>('@ngrx/store/init'),
      tap(() => {
        if (localStorage.getItem(JWT_LOCALE_KEY) != null) {
          this.subscriptionRefreshToken = this.authService
            .initTimer()
            .subscribe();
        }
      })
    )
  );

  public authenticationSigninEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<AuthenticationSignin>(
        AuthenticationActionEnum.AUTHENTICATION_SIGNIN
      ),
      map((action: AuthenticationSignin) => action.payload),
      exhaustMap((credentials: Credential) =>
        this.authService.signin(credentials).pipe(
          map((token: string) => new AuthenticationSigninSuccess(token)),
          tap((token) => {
            this.subscriptionRefreshToken = this.authService
              .initTimer()
              .subscribe();
          }),
          catchError((error: any) => of(new AuthenticationSigninError(error)))
        )
      )
    )
  );

  public authenticationSignup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<AuthenticationSignup>(
        AuthenticationActionEnum.AUTHENTICATION_SIGNUP
      ),
      map((action: AuthenticationSignup) => action.payload),
      exhaustMap((user: IUser) =>
        this.authService.signup(user).pipe(
          map(() => new AuthenticationSignupSuccess()),
          catchError((error: any) => of(new AuthenticationSignupError(error)))
        )
      )
    )
  );

  public tryRefreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActionEnum.AUTHENTICATION_REFRESH_TOKEN),
      switchMap(() =>
        this.authService.refreshToken().pipe(
          map((token) => {
            return new AuthenticationSigninSuccess(token);
          }),
          catchError(() => of(new AuthenticationSigninError()))
        )
      )
    )
  );

  public logout$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType<AuthenticationLogout>(
          AuthenticationActionEnum.AUTHENTICATION_LOGOUT
        ),
        tap(() => this.subscriptionRefreshToken.unsubscribe())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
