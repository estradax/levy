import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  isOpen$ = new BehaviorSubject(false);
  message$ = new BehaviorSubject('Default message');
  open() {
    this.isOpen$.next(true);
  }

  openWith(message: string) {
    this.message$.next(message);
    this.isOpen$.next(true);
  }

  close() {
    this.isOpen$.next(false);
  }
}
