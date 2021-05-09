import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { calculate, setFormControlValue } from './helper/calculator';
import { DOSAGE_UNITS } from './helper/constants';
import { volumeRatioValidator } from './helper/volume-ratio-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  herbicides: FormArray = new FormArray([]);

  dosageUnits = DOSAGE_UNITS;
  userVolumeUnits: { [key: number]: string[] } = {};

  constructor(private fb: FormBuilder) {}

  get herbFormGroups(): FormGroup[] {
    return this.herbicides.controls as FormGroup[];
  }

  ngOnInit(): void {
    this.addHerbicide();
  }

  addHerbicide(): void {
    this.herbicides.push(this.createHerbicide());
  }

  onDosageUnitChange(unit: string, index: number): void {
    this.userVolumeUnits[index] = unit.split('/');
  }

  resetHerbicides(): void {
    this.herbicides.clear();
    this.userVolumeUnits = {};
    this.addHerbicide();
  }

  calculateDosage(): void {
    this.herbFormGroups.forEach((formGroup: FormGroup) => {
      if (formGroup.valid) {
        calculate(formGroup);
      } else {
        setFormControlValue(
          formGroup,
          'dosageResult',
          `Need more info for calculation!`
        );
      }
    });
  }

  private createHerbicide(): FormGroup {
    return this.fb.group({
      herbicideName: [''],
      recommendedRate: ['', [Validators.required, volumeRatioValidator]],
      recommendedUnit: ['', [Validators.required]],
      userVolume: ['', [Validators.required]],
      userVolumeUnit: ['', [Validators.required]],
      dosageResult: [''],
    });
  }
}
