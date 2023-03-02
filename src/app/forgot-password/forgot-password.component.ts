import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordService } from '../lib/password/password.service';
import { NgIf } from '@angular/common';
import { AlertService } from '../lib/alert/alert.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  providers: [PasswordService],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  constructor(
    private passwordService: PasswordService,
    private alertService: AlertService
  ) {}

  forgotPasswordSubmit() {
    this.passwordService
      .sendResetLink(this.emailControl.getRawValue())
      .subscribe({
        error: () => this.alertService.open(),
        next: () => {
          // Do something
        },
      });
  }
}
