import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtToken } from '../authentication/models/class/jwt-token.model';
import { AuthService } from '../authentication/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  public token: JwtToken;
  public subscription: Subscription = new Subscription();
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.subscription.add(
      this.authService.token$.subscribe((token: JwtToken) => {
        this.token = token;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
