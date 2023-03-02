import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { handleApiError, handleExceptionThrown } from '../utils/utils';
import { ApiResponse } from '../api-response.interface';
import { PasswordReset } from './password.type';

@Injectable()
export class PasswordService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  sendResetLink(email: string) {
    return this.authService.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post<ApiResponse>(`${environment.apiHostUrl}/forgot-password`, {
            email,
          })
          .pipe(catchError(handleExceptionThrown), handleApiError());
      })
    );
  }

  reset(data: PasswordReset) {
    return this.authService.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post<ApiResponse>(`${environment.apiHostUrl}/reset-password`, data)
          .pipe(catchError(handleExceptionThrown), handleApiError());
      })
    );
  }
}
