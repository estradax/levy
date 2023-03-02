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

export const formatDateToMatchedOurStyle = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
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
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  return `${month}, ${year}`;
};
