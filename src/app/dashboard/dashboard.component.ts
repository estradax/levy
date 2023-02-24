import { Component } from '@angular/core';
import { AuthService } from '../lib/auth/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

const months = [
  'Jan',
  'Feb',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

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
      const createdAtAsDate = new Date(Date.parse(userInfo.created_at));
      const year = createdAtAsDate.getFullYear();
      const month = months[createdAtAsDate.getMonth()];
      userInfo.created_at = `${month}, ${year}`;
    })
  );

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']).catch((err) => console.error(err));
    });
  }
}
