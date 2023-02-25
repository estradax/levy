import { Component } from '@angular/core';
import { AuthService } from '../lib/auth/auth.service';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

export const passwordMatchingValidator: ValidatorFn = (
  control: AbstractControl
) => {
  const password = control.get('password')!;
  const passwordConfirmation = control.get('password_confirmation')!;
  return password.value === passwordConfirmation.value
    ? null
    : { notMatch: true };
};

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
      validators: passwordMatchingValidator,
    }
  );
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  registerFormSubmit() {
    this.auth.register(this.registerForm.getRawValue()).subscribe(() => {
      this.router.navigate(['']).catch((err) => console.log(err));
    });
  }
}
