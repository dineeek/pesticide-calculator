import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get herbicides(): FormArray {
    return this.form.get('herbicides') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      herbicides: this.setInitialHerbicide(),
    });

    console.log('DINOO', this.herbicides.controls[0]);
  }

  addHerbicide(): void {
    (this.form.get('herbicides') as FormArray).push(this.createHerbicide());
  }

  resetHerbicides(): void {
    this.herbicides.clear();
    this.addHerbicide();
  }

  private setInitialHerbicide(): FormArray {
    return this.fb.array([this.createHerbicide()]);
  }

  private createHerbicide(): FormGroup {
    return this.fb.group({
      herbicide: [''],
      dosage: ['', [Validators.required]],
      userLiters: ['', [Validators.required]],
      dosageResult: [''],
    });
  }
}
