import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

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

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  updated_at: string;
  created_at: string;
}

interface PasswordResetForm {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = this.http.get(`${environment.apiHostUrl}/api/user`).pipe(
    map(() => true),
    catchError(() => {
      return of(false);
    })
  );

  userInfo$ = this.http.get<UserInfo>(`${environment.apiHostUrl}/api/user`);

  csrf$ = this.http.get(`${environment.apiHostUrl}/sanctum/csrf-cookie`);

  constructor(private http: HttpClient) {}

  login(props: LoginForm) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http.post(`${environment.apiHostUrl}/login`, props);
      })
    );
  }

  register(props: RegisterForm) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http.post(`${environment.apiHostUrl}/register`, props);
      })
    );
  }

  logout() {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http.post(`${environment.apiHostUrl}/logout`, {});
      })
    );
  }

  sendPasswordResetLink(email: string) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http.post(`${environment.apiHostUrl}/forgot-password`, {
          email,
        });
      })
    );
  }

  passwordReset(form: PasswordResetForm) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http.post(`${environment.apiHostUrl}/reset-password`, form);
      })
    );
  }
}
