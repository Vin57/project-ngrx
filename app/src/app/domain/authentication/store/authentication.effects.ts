import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService, JWT_LOCALE_KEY } from '../services/auth.service';
import {
  AuthenticationActionEnum,
  AuthenticationSignin,
  AuthenticationSigninError,
  AuthenticationSigninSuccess,
  AuthenticationSignup,
  AuthenticationSignupActions,
  AuthenticationSignupError,
  AuthenticationSignupSuccess,
} from './authentication.actions';
import { Credential } from './models/credential.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationEffects {
  public authenticationSigninEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<AuthenticationSignin>(
        AuthenticationActionEnum.AUTHENTICATION_SIGNIN
      ),
      map((action: AuthenticationSignin) => action.payload),
      exhaustMap((credentials: Credential) =>
        this.authService.signin(credentials).pipe(
          map((token: string) => new AuthenticationSigninSuccess(token)),
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
    );
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
