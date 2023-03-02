import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../lib/password/password.service';
import { NgIf } from '@angular/common';
import { AlertService } from '../lib/alert/alert.service';
import { combineLatest, map, tap } from 'rxjs';
import { passwordConfirmed } from '../lib/password/password.validator';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  providers: [PasswordService],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  passwordResetForm = this.fb.nonNullable.group(
    {
      token: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: [''],
    },
    {
      validators: passwordConfirmed,
    }
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private passwordService: PasswordService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const emailChanges$ =
      this.passwordResetForm.controls.email.valueChanges.pipe(
        tap(() => {
          if (this.passwordResetForm.controls.email.valid) return;
          this.alertService.open();
        })
      );

    emailChanges$.subscribe();

    const token$ = this.route.paramMap.pipe(
      map((paramMap) => {
        if (!paramMap.has('token')) return null;
        return paramMap.get('token') as string;
      })
    );

    const email$ = this.route.queryParamMap.pipe(
      map((queryParamMap) => {
        if (!queryParamMap.has('email')) return null;
        return queryParamMap.get('email') as string;
      })
    );

    const patchValue$ = combineLatest([token$, email$]).pipe(
      tap(([token, email]) => {
        if (!token || !email) {
          this.alertService.open();
          return;
        }

        this.passwordResetForm.patchValue({
          token: token as string,
          email: email as string,
        });
      })
    );

    patchValue$.subscribe();
  }

  passwordResetFormSubmit() {
    this.passwordService.reset(this.passwordResetForm.getRawValue()).subscribe({
      error: () => this.alertService.open(),
      next: () =>
        this.router.navigate(['login']).catch((err) => console.error(err)),
    });
  }
}
