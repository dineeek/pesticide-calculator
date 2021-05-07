import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DOSAGE_UNITS } from './helper/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  herbicides: FormArray = new FormArray([]);

  dosageUnits = DOSAGE_UNITS;
  userVolumeUnits: string[] = [];

  constructor(private fb: FormBuilder) {}

  get herbFormGroups(): FormGroup[] {
    return this.herbicides.controls as FormGroup[];
  }

  ngOnInit(): void {
    this.addHerbicide();

    this.herbFormGroups.forEach((formGroup: FormGroup) => {
      this.getFormControl(formGroup, 'dosageUnit').valueChanges.subscribe(
        (value: string) => (this.userVolumeUnits = value.split('/'))
      );
    });
  }

  addHerbicide(): void {
    this.herbicides.push(this.createHerbicide());
  }

  resetHerbicides(): void {
    this.herbicides.clear();
    this.addHerbicide();
  }

  calculateDosage(): void {
    this.herbFormGroups.forEach((formGroup: FormGroup) => {
      if (formGroup.valid) {
        //1. case L and 2. case kg -- send form controls to he calculator function
        const ratio: string = this.getFormControl(
          formGroup,
          'dosageVolume'
        ).value.split('/');

        const dosageResult = (
          (Number(ratio[0]) / Number(ratio[1])) *
          Number(this.getFormControl(formGroup, 'userVolume').value)
        ).toFixed(2);

        this.setFormControlValue(
          formGroup,
          'dosageResult',
          `${dosageResult} ${
            this.getFormControl(formGroup, 'dosage').value.split('/')[0]
          }`
        );
      }
    });
  }

  private createHerbicide(): FormGroup {
    return this.fb.group({
      herbicide: [''],
      dosageVolume: ['', [Validators.required]],
      dosageUnit: ['', [Validators.required]],
      userVolume: ['', [Validators.required]],
      userVolumeUnit: ['', [Validators.required]],
      dosageResult: [''],
    });
  }

  private getFormControl(form: FormGroup, controlName: string): FormControl {
    return form.get(controlName) as FormControl;
  }

  private setFormControlValue(
    form: FormGroup,
    controlName: string,
    value: string
  ): void {
    return form.get(controlName)?.setValue(value);
  }
}
