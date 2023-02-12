import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {switchMap} from "rxjs";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    return this.http.get('//localhost:8000/api/user', {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
      })
    });
  }

  csrf() {
    return this.http.get('//localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    });
  }

  register(props: RegisterForm) {
    return this.csrf().pipe(
      switchMap(() => {
        return this.http.post('//localhost:8000/register', props, {
          withCredentials: true,
          headers: new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest'
          })
        });
      })
    );
  }
}
