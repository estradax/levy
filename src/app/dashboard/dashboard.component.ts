import { Component, OnInit } from '@angular/core';
import { AuthService, UserInfo } from '../auth/auth.service';

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
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userInfo: UserInfo | null;

  constructor(private authService: AuthService) {
    this.userInfo = null;
  }

  ngOnInit() {
    this.authService.userInfo$.subscribe((data) => {
      const createdAtAsDate = new Date(Date.parse(data.created_at));
      const year = createdAtAsDate.getFullYear();
      const month = months[createdAtAsDate.getMonth()];
      data.created_at = `${month}, ${year}`;
      this.userInfo = data;
    });
  }
}
