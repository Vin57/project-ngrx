import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationFetchCurrentUser } from 'src/app/domain/authentication/store/authentication.actions';
import { IUser } from 'src/app/shared/models/user.model';
import { authCurrentUserSelector } from 'src/app/shared/store/selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public currentUser$: Observable<IUser>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.pipe(select(authCurrentUserSelector));
    this.store.dispatch(new AuthenticationFetchCurrentUser());
  }
}
