import { inject } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { throwError } from 'rxjs';

export const handleExceptionThrown = (err: Error) => {
  const alertService = inject(AlertService);
  alertService.open();
  return throwError(() => err);
};
