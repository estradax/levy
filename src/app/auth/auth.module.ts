import { NgModule } from '@angular/core';
import { RedirectIfAuthenticatedGuard } from './redirect-if-authenticated.guard';
import { RedirectIfGuestGuard } from './redirect-if-guest.guard';
import { AuthService } from './auth.service';

@NgModule({
  providers: [AuthService, RedirectIfGuestGuard, RedirectIfAuthenticatedGuard],
})
export class AuthModule {}
