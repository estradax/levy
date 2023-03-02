import { Component } from '@angular/core';
import { AuthService } from '../lib/auth/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { formatDateToMatchedOurStyle } from '../lib/utils/utils';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userInfo$ = this.authService.userInfo$.pipe(
    tap((userInfo) => {
      userInfo.created_at = formatDateToMatchedOurStyle(
        new Date(Date.parse(userInfo.created_at))
      );
    })
  );

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']).catch((err) => console.error(err));
    });
  }
}
