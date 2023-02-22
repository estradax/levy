import { Component } from '@angular/core';
import { AuthService } from '../lib/auth/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgIf],
  providers: [ProfileService],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  editForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
  });
  userInfo$ = this.authService.userInfo$.pipe(
    tap((userInfo) => {
      this.editForm.controls['name'].setValue(userInfo.name);
    })
  );

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {}

  editFormSubmit() {
    this.profileService.edit(this.editForm.getRawValue()).subscribe(() => {
      // Do something when edit profile success.
    });
  }

  verifyEmail() {
    this.profileService.verifyEmail().subscribe(() => {
      // Do something when email is verified
    });
  }
}
