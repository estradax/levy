import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { handleApiError, handleExceptionThrown } from '../utils/utils';
import { ApiResponse } from '../api-response.interface';
import { Login, Register } from './auth.type';
import { UserInfo } from './userinfo.type';

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

  login(data: Login) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post<ApiResponse>(`${environment.apiHostUrl}/login`, data)
          .pipe(catchError(handleExceptionThrown), handleApiError());
      })
    );
  }

  register(data: Register) {
    return this.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post<ApiResponse>(`${environment.apiHostUrl}/register`, data)
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
