import { AbstractControl, ValidatorFn } from '@angular/forms';

export const confirmed: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password')?.value || '';
  const passwordConfirmation =
    control.get('password_confirmation')?.value || '';
  return password === passwordConfirmation ? null : { notMatch: true };
};
