import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/consts/api.consts';
import { IUser } from 'src/app/shared/models/user.model';
import { authTokenSelector } from 'src/app/shared/store/selector';
import { JwtToken } from '../models/class/jwt-token.model';
import { AuthenticationRefreshToken } from '../store/authentication.actions';
import { Credential } from '../store/models/credential.model';

export const JWT_LOCALE_KEY = 'jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: JwtToken;
  constructor(private http: HttpClient, private store: Store) {
    this.initToken();
  }

  public initToken() {
    this.store
      .pipe(select(authTokenSelector))
      .subscribe((token) => (this.token = token));
  }

  /**
   * Ensure that current authentication token stay fresh
   * @returns
   */
  public initTimer() {
    // In real conditions, token expire should be 15 minutes and so timer delay would be updated in consequences to be called every 5 minutes
    return timer(10000, 10000).pipe(
      tap(() => {
        this.store.dispatch(new AuthenticationRefreshToken());
      })
    );
  }

  public refreshToken(): Observable<string> {
    return this.http.get<string>(`${API_URL}/auth/refresh-token`);
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
      .pipe(tap((token) => localStorage.setItem(JWT_LOCALE_KEY, token)));
  }

  /**
   * Check whether or not, current token is authenticated.
   * @returns
   */
  isAuthenticated(): boolean {
    return this.token.isAuthenticated;
  }
}
