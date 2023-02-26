import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  isOpen$ = new BehaviorSubject(false);

  constructor() { }

  open() {
    this.isOpen$.next(true);
  }

  close() {
    this.isOpen$.next(false);
  }
}
