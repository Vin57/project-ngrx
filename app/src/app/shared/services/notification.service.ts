import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { from, of, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { API_URL } from '../consts/api.consts';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly publicKey =
    'BL1VibTJ3jx82ElmRK1azc8qC--uE4vNXIzZPqyMbxWHguElVaP-QsW5gwrHR3YgRtDAUNUeNi3lJawTZdOBu5Y';
  private subscription: Subscription;

  constructor(private swPush: SwPush, private http: HttpClient) {}

  public offerNotifications() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = from(
      this.swPush.requestSubscription({
        serverPublicKey: this.publicKey,
      })
    )
      .pipe(
        switchMap((sub: PushSubscription) => {
          // Notifications allowed by user
          return this.http.post(`${API_URL}/notifications`, sub);
        }),
        catchError((err) => {
          // Notifications denied by user or error occurs
          return of(null);
        })
      )
      .subscribe();
  }
}
