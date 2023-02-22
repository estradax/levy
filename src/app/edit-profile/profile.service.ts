import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../lib/auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

interface EditProfileForm {
  name: string;
}

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  edit(form: EditProfileForm) {
    return this.authService.csrf$.pipe(
      switchMap(() => {
        return this.http.put(`${environment.apiHostUrl}/profile/update`, form);
      })
    );
  }

  verifyEmail() {
    return this.authService.csrf$.pipe(
      switchMap(() => {
        return this.http
          .post(`${environment.apiHostUrl}/email/verification-notification`, {})
          .pipe(
            catchError((err) => {
              return throwError(() => err);
            })
          );
      })
    );
  }
}
