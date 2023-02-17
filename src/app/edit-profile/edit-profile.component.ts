import { Component, OnInit } from '@angular/core';
import { AuthService, UserInfo } from '../auth/auth.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  userInfo: UserInfo | null;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = fb.group({
      name: [''],
    });
    this.userInfo = null;
  }
  ngOnInit(): void {
    this.authService.userInfo().subscribe((user) => {
      this.form.controls['name'].setValue(user.name);
      this.userInfo = user;
    });
  }

  submit() {
    this.authService.editProfile(this.form.value).subscribe(() => {
      // Do something when edit profile success.
    });
  }
}
