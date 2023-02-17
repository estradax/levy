import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  loginFormSubmit() {
    this.auth.login(this.loginForm.getRawValue()).subscribe(() => {
      this.router.navigate(['']).catch((err) => console.log(err));
    });
  }
}
