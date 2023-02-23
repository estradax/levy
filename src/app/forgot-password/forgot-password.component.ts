import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../lib/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  imports: [ReactiveFormsModule, FormsModule],
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(private authService: AuthService) {}

  forgotPasswordSubmit() {
    this.authService
      .sendPasswordResetLink(this.emailControl.getRawValue())
      .subscribe(() => {
        // Do something
      });
  }
}
