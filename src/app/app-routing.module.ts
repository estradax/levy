import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RedirectIfAuthenticatedGuard} from "./auth/redirect-if-authenticated.guard";
import {RedirectIfGuestGuard} from "./auth/redirect-if-guest.guard";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [RedirectIfGuestGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectIfAuthenticatedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectIfAuthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
