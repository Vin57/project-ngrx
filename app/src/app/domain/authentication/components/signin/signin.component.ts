import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({});
  public error: string;
  public subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public submit(): void {
    this.subscription.add(
      this.authService.signin(this.form.value).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (err) => {
          this.error = 'Une erreur est survenue, veuillez rééssayer';
          console.log(err);
        }
      )
    );
  }
}
