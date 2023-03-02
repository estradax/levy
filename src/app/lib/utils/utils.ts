import { inject } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { map, throwError } from 'rxjs';
import { ApiResponse } from '../api-response.interface';

export const handleExceptionThrown = (err: Error) => {
  const alertService = inject(AlertService);
  alertService.open();
  return throwError(() => err);
};

export const handleApiError = () => {
  return map((res: ApiResponse) => {
    if (res.error) throw new Error(res.error.message);
  });
};