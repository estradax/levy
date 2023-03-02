import { AbstractControl, ValidatorFn } from '@angular/forms';

export const passwordConfirmed: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password')!;
  const passwordConfirmation = control.get('password_confirmation')!;
  return password.value === passwordConfirmation.value
    ? null
    : { notMatch: true };
};
