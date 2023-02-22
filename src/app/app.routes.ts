import { Router, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { inject } from '@angular/core';
import { AuthService } from './lib/auth/auth.service';
import { map } from 'rxjs';
import { PasswordResetComponent } from './password-reset/password-reset.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [
      () => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated$.pipe(
          map((isAuthenticated) => {
            if (!isAuthenticated) {
              return router.createUrlTree(['login']);
            }
            return true;
          })
        );
      },
    ],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
    ],
  },
  {
    path: '',
    canActivateChild: [
      () => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated$.pipe(
          map((isAuthenticated) => {
            if (isAuthenticated) {
              return router.createUrlTree(['']);
            }
            return true;
          })
        );
      },
    ],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'password-reset/:token',
    component: PasswordResetComponent,
  },
];
