import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.form = fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    })
  }

  submit() {
    this.auth.register(this.form.value).subscribe(() => {
      console.log("login proced");
    })
  }
}
