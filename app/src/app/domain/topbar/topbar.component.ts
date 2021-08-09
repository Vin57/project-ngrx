import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { authTokenSelector } from 'src/app/shared/store/selector';
import { JwtToken } from '../authentication/models/class/jwt-token.model';
import { AuthenticationLogout } from '../authentication/store/authentication.actions';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  public jwtToken: JwtToken;
  public subscription: Subscription = new Subscription();

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.pipe(select(authTokenSelector)).subscribe((token: JwtToken) => {
      console.log(token);

      this.jwtToken = token;
    });
  }

  public logout(): void {
    this.store.dispatch(new AuthenticationLogout());
    this.router.navigate(['/signin']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
