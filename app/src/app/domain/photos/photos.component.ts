import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPhoto } from './models/photo.interface';
import { photosPictureSelector } from './store/photos.selectors';

@Component({
  selector: 'app-photo',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  public photos$: Observable<IPhoto[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.photos$ = this.store.pipe(select(photosPictureSelector));
  }
}
