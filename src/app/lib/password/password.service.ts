import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { handleApiError, handleExceptionThrown } from '../utils/utils';
import { ApiResponse } from '../api-response.interface';

interface PasswordResetForm {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

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

  reset(form: PasswordResetForm) {
    return this.authService.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post<ApiResponse>(`${environment.apiHostUrl}/reset-password`, form)
          .pipe(catchError(handleExceptionThrown), handleApiError());
      })
    );
  }
}
