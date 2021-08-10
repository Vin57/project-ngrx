import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IPhoto } from './models/photo.interface';
import { photosPictureSelector } from './store/photos.selectors';

@Component({
  selector: 'app-photo',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  public photos$: Observable<IPhoto[]>;
  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.photos$ = this.store.pipe(select(photosPictureSelector));
  }

  sendSampleNotification() {
    this.notificationService.sendSampleNotification();
  }
}
