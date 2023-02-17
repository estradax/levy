import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface EditProfileForm {
  name: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  updated_at: string;
  created_at: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  userInfo() {
    return this.http.get<UserInfo>('//localhost:8000/api/user');
  }

  isAuthenticated() {
    return this.http.get('//localhost:8000/api/user').pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  csrf() {
    return this.http.get('//localhost:8000/sanctum/csrf-cookie');
  }

  editProfile(props: EditProfileForm) {
    return this.csrf().pipe(
      switchMap(() => {
        return this.http.put('//localhost:8000/update-profile', props);
      })
    );
  }

  login(props: LoginForm) {
    return this.csrf().pipe(
      switchMap(() => {
        return this.http.post('//localhost:8000/login', props);
      })
    );
  }

  register(props: RegisterForm) {
    return this.csrf().pipe(
      switchMap(() => {
        return this.http.post('//localhost:8000/register', props);
      })
    );
  }
}
