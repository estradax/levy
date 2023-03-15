import {Component, OnInit} from '@angular/core';
import { AlertService } from '../lib/alert/alert.service';
import { AsyncPipe, NgIf } from '@angular/common';
import {delayWhen, interval} from "rxjs";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  isOpen$ = this.alertService.isOpen$.pipe(
    delayWhen((isOpen) => {
      if (!isOpen) return interval(5000);
      return interval(0);
    })
  );

  isOpen = false;

  constructor(public alertService: AlertService) {}

  ngOnInit() {
    this.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
      if (isOpen) {
        this.alertService.close();
      }
    });
  }
}
