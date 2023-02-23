import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../lib/password/password.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [PasswordService],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent {
  passwordResetForm = this.fb.nonNullable.group({
    password: ['', [Validators.required]],
    password_confirmation: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private passwordService: PasswordService,
    private router: Router
  ) {}

  passwordResetFormSubmit() {
    const token = this.route.snapshot.paramMap.get('token')!;
    const email = this.route.snapshot.queryParamMap.get('email')!;

    this.passwordService
      .reset({
        token,
        email,
        password: this.passwordResetForm.get('password')!.value,
        password_confirmation: this.passwordResetForm.get(
          'password_confirmation'
        )!.value,
      })
      .subscribe(() => {
        this.router.navigate(['login']).catch((err) => {
          console.error(err);
        });
      });
  }
}
