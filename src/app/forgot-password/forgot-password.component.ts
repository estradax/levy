import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordService } from '../lib/password/password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  providers: [PasswordService],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(private passwordService: PasswordService) {}

  forgotPasswordSubmit() {
    this.passwordService
      .sendResetLink(this.emailControl.getRawValue())
      .subscribe(() => {
        // Do something
      });
  }
}
