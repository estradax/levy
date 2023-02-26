import { Component } from '@angular/core';
import { AlertService } from '../lib/alert/alert.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  constructor(public alertService: AlertService) {}
}
