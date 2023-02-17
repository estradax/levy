import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RedirectIfGuestGuard} from "./auth/redirect-if-guest.guard";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {LoginComponent} from "./login/login.component";
import {RedirectIfAuthenticatedGuard} from "./auth/redirect-if-authenticated.guard";
import {RegisterComponent} from "./register/register.component";

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [RedirectIfGuestGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectIfAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectIfAuthenticatedGuard],
  },
];
