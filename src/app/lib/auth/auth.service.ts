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

  private csrf$ = this.http.get(
    `${environment.apiHostUrl}/sanctum/csrf-cookie`
  );

  constructor(private http: HttpClient) {}

  editProfile(props: EditProfileForm) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http.put(`${environment.apiHostUrl}/update-profile`, props);
      })
    );
  }

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
}
