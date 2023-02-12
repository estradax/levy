import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = authService.isAuthenticated();
  }
}
