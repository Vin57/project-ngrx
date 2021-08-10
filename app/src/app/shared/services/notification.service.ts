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
    'BGwKBg8cu8LJvmQiI4OnETTGqjtajhQiKUQBbazYPGjUX0oFbDsn0bKVLEcpLrBn8t7DsfnFh6tAgGtfFqyFQbQ';
  private offerNotificationSubscription: Subscription;
  private sendSampleNotificationSubscription: Subscription;

  constructor(private swPush: SwPush, private http: HttpClient) {}

  public offerNotifications() {
    if (this.offerNotificationSubscription) {
      this.offerNotificationSubscription.unsubscribe();
    }

    this.offerNotificationSubscription = from(
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

  public sendSampleNotification() {
    if (this.sendSampleNotificationSubscription) {
      this.sendSampleNotificationSubscription.unsubscribe();
    }
    this.sendSampleNotificationSubscription = this.http
      .get(`${API_URL}/notifications/test`)
      .subscribe();
  }
}
