import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgIf],
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

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  editFormSubmit() {
    this.authService.editProfile(this.editForm.getRawValue()).subscribe(() => {
      // Do something when edit profile success.
    });
  }
}
