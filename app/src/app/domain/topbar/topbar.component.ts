import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { authTokenSelector } from 'src/app/shared/store/selector';
import { JwtToken } from '../authentication/models/class/jwt-token.model';
import { AuthenticationLogout } from '../authentication/store/authentication.actions';
import {
  PhotosActionFetch,
  PhotosActionSetFilter,
} from '../photos/store/photos.actions';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  public jwtToken: JwtToken;
  public subscription: Subscription = new Subscription();
  public form: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      search: [],
    });
    this.store.pipe(select(authTokenSelector)).subscribe((token: JwtToken) => {
      console.log(token);

      this.jwtToken = token;
    });
  }

  get search(): FormControl {
    return this.form.get('search') as FormControl;
  }

  public logout(): void {
    this.store.dispatch(new AuthenticationLogout());
    this.router.navigate(['/signin']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applySearch() {
    this.store.dispatch(new PhotosActionSetFilter(this.search.value));
    this.store.dispatch(new PhotosActionFetch());
  }
}
