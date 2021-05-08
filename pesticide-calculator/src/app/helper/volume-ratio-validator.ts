import { AbstractControl, ValidatorFn } from '@angular/forms';

export function volumeRatioValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const ratioValues: string[] = control.value.split('/');
  const areValidRations: boolean =
    ratioValues.length === 2 &&
    !isNaN(Number(ratioValues[0])) &&
    !isNaN(Number(ratioValues[1]));
  return areValidRations ? null : { validRatioVolume: true };
}
