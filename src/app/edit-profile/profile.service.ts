import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../lib/auth/auth.service';
import { catchError, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { handleApiError, handleExceptionThrown } from '../lib/utils/utils';
import { ApiResponse } from '../lib/api-response.interface';

interface EditProfileForm {
  name: string;
}

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  edit(form: EditProfileForm) {
    return this.authService.csrf$.pipe(
      switchMap(() => {
        return this.http
          .put<ApiResponse>(`${environment.apiHostUrl}/profile/update`, form)
          .pipe(catchError(handleExceptionThrown), handleApiError());
      })
    );
  }

  verifyEmail() {
    return this.authService.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post(`${environment.apiHostUrl}/email/verification-notification`, {})
          .pipe(catchError(handleExceptionThrown));
      })
    );
  }
}
