import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, switchMap} from "rxjs";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
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
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  userInfo() {
    return this.http.get<UserInfo>('//localhost:8000/api/user', {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    });
  }

  isAuthenticated() {
    return this.http.get('//localhost:8000/api/user', {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
      })
    }).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    )
  }

  csrf() {
    return this.http.get('//localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    });
  }

  register(props: RegisterForm) {
    return this.csrf().pipe(
      switchMap(() => {
        return this.http.post('//localhost:8000/register', props, {
          withCredentials: true,
          headers: new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest'
          })
        });
      })
    );
  }
}
