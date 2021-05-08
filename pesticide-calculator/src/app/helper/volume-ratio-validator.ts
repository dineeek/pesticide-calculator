import { AbstractControl, ValidatorFn } from '@angular/forms';

export function volumeRatioValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  return control.value.split('/').length !== 2
    ? { validRatioVolume: true }
    : null;
}
