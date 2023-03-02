import { Component } from '@angular/core';
import { AuthService } from '../lib/auth/auth.service';
import { AlertService } from '../lib/alert/alert.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { confirmed } from '../lib/password/password.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: [''],
    },
    {
      validators: confirmed,
    }
  );
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  registerFormSubmit() {
    this.auth.register(this.registerForm.getRawValue()).subscribe({
      error: () => this.alertService.open(),
      next: () => this.router.navigate(['']).catch((err) => console.log(err)),
    });
  }
}
