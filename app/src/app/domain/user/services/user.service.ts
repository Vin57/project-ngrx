import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/consts/api.consts';
import { IUser } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${API_URL}/user/current`).pipe(
      tap((user: IUser) => this.currentUser.next(user)),
      switchMap(() => this.currentUser)
    );
  }
}
