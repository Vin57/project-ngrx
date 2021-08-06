import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subscription, timer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/consts/api.consts';
import { IUser } from 'src/app/shared/models/user.model';
import { authTokenSelector } from 'src/app/shared/store/selector';
import { JwtToken } from '../models/class/jwt-token.model';
import {
  AuthenticationLogout,
  AuthenticationSigninError,
  AuthenticationSigninSuccess,
} from '../store/authentication.actions';
import { Credential } from '../store/models/credential.model';

export const JWT_LOCALE_KEY = 'jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public subscription: Subscription;
  public token: JwtToken;
  constructor(private http: HttpClient, private store: Store) {
    // Subscribe to token modifications
    this.store
      .pipe(select(authTokenSelector))
      .subscribe((token) => (this.token = token));
    this.subscription = this.initTimer().subscribe();
  }

  /**
   * Ensure that current authentication token stay fresh
   * @returns
   */
  public initTimer(): Observable<string> {
    // In real conditions, token expire should be 15 minutes and so timer delay would be updated in consequences to be called every 5 minutes
    return timer(2000, 5000).pipe(
      switchMap(() => {
        if (!localStorage.getItem(JWT_LOCALE_KEY)) {
          // If there is no locale token, no need to refresh it...
          this.subscription.unsubscribe();
          return of(null);
        }
        return this.http.get<string>(`${API_URL}/auth/refresh-token`).pipe(
          tap((token: string) => {
            this.store.dispatch(new AuthenticationSigninSuccess(token));
          }),
          catchError((err) => {
            this.store.dispatch(new AuthenticationSigninError(err));
            this.subscription.unsubscribe(); // Stop subscription to current observable (prevent calling api forever)
            return of(null);
          })
        );
      })
    );
  }

  /**
   * Signup a user
   * @param user
   * @returns
   */
  signup(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/auth/signup`, user);
  }

  /**
   * Signin a user
   * @param credentials
   * @returns
   */
  signin(credentials: Credential): Observable<string> {
    return this.http
      .post<string>(`${API_URL}/auth/signin`, credentials)
      .pipe(map((token: string) => token));
  }

  /**
   * Logout current user
   */
  logout(): void {
    localStorage.removeItem(JWT_LOCALE_KEY);
    this.store.dispatch(new AuthenticationLogout());
  }

  /**
   * Check whether or not, current token is authenticated.
   * @returns
   */
  isAuthenticated(): boolean {
    return localStorage.getItem(JWT_LOCALE_KEY) && this.token.isAuthenticated;
  }
}
