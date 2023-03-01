import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AlertService } from '../alert/alert.service';

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

interface ErrorObject {
  type: string;
  message: string;
}

interface ApiResponse {
  error: ErrorObject | null;
  data: object | null;
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
    .pipe(catchError(this.handleExceptionThrown));

  constructor(private http: HttpClient, private alertService: AlertService) {}

  private handleExceptionThrown(err: Error) {
    this.alertService.open();
    return throwError(() => err);
  }

  private handleApiError() {
    return map((res: ApiResponse) => {
      if (res.error) throw new Error(res.error.message);
    });
  }

  login(props: LoginForm) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post<ApiResponse>(`${environment.apiHostUrl}/login`, props)
          .pipe(catchError(this.handleExceptionThrown), this.handleApiError());
      })
    );
  }

  register(props: RegisterForm) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post<ApiResponse>(`${environment.apiHostUrl}/register`, props)
          .pipe(catchError(this.handleExceptionThrown), this.handleApiError());
      })
    );
  }

  logout() {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post(`${environment.apiHostUrl}/logout`, {})
          .pipe(catchError(this.handleExceptionThrown));
      })
    );
  }
}
