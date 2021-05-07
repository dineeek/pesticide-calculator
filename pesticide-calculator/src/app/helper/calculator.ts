import { FormGroup, FormControl } from '@angular/forms';

export function calculate(formGroup: FormGroup): void {
  const ratio: string = getFormControl(formGroup, 'dosageVolume').value.split(
    '/'
  );

  const ratioUnits: string = getFormControl(
    formGroup,
    'dosageUnit'
  ).value.split('/');

  const userUnitInput = getFormControl(formGroup, 'userVolumeUnit').value;

  const recommendedDosage = Number(ratio[0]) / Number(ratio[1]);
  const userVolume = Number(getFormControl(formGroup, 'userVolume').value);

  let dosageResult: string;
  let dosageResultUnit: string;

  if (userUnitInput === ratioUnits[0]) {
    dosageResult = (userVolume / recommendedDosage).toFixed(2);
    dosageResultUnit = ratioUnits[1];
  } else {
    dosageResult = (recommendedDosage * userVolume).toFixed(2);
    dosageResultUnit = ratioUnits[0];
  }

  setFormControlValue(
    formGroup,
    'dosageResult',
    `${dosageResult} ${dosageResultUnit}`
  );
}

export function getFormControl(
  form: FormGroup,
  controlName: string
): FormControl {
  return form.get(controlName) as FormControl;
}

export function setFormControlValue(
  form: FormGroup,
  controlName: string,
  value: string
): void {
  return form.get(controlName)?.setValue(value);
}
