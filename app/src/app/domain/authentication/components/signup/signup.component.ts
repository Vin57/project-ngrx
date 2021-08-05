import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
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
      email: ['', [Validators.email, Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public submit(): void {
    this.subscription.add(
      this.authService.signup(this.form.value).subscribe(
        (user: IUser) => {
          this.router.navigate(['/signin']);
        },
        (err) => {
          this.error = 'Une erreur est survenue, veuillez rééssayer';
          console.log(err);
        }
      )
    );
  }
}
