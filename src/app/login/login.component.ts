import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../lib/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AlertService } from '../lib/alert/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  loginFormSubmit() {
    this.auth.login(this.loginForm.getRawValue()).subscribe({
      error: (e) => this.alertService.openWith(e.message),
      next: () => this.router.navigate(['']).catch((err) => console.error(err)),
    });
  }
}
