import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { handleApiError, handleExceptionThrown } from '../utils/utils';
import { ApiResponse } from '../api-response.interface';

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

  csrf$ = this.http
    .get(`${environment.apiHostUrl}/sanctum/csrf-cookie`)
    .pipe(catchError(handleExceptionThrown));

  constructor(private http: HttpClient) {}

  login(props: LoginForm) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post<ApiResponse>(`${environment.apiHostUrl}/login`, props)
          .pipe(catchError(handleExceptionThrown), handleApiError());
      })
    );
  }

  register(props: RegisterForm) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post<ApiResponse>(`${environment.apiHostUrl}/register`, props)
          .pipe(catchError(handleExceptionThrown), handleApiError());
      })
    );
  }

  logout() {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post(`${environment.apiHostUrl}/logout`, {})
          .pipe(catchError(handleExceptionThrown));
      })
    );
  }
}
