import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-window',
  imports: [NgFor, ReactiveFormsModule],
  template:`
    <form [formGroup]="userForm" (ngSubmit)="onSubmitForm()" >
      <div>
        <label for="name">Name : </label>
        <input type="text" name="name" id="name" formControlName="name" >
        <label for="email">Email : </label>
        <input type="text" name="email" id="email" formControlName="email" >
      </div>
      <div formGroupName="address">
        <label for="street">Street : </label>
        <input type="text" name="street" id="street" formControlName="street" >
        <label for="city">City : </label>
        <input type="text" name="city" id="city" formControlName="city" >
      </div>
      <div formArrayName="phoneNumbers" >
        <div *ngFor=" let phoneNumber of phoneNumbers.controls; let i = index" >
          <label for="i">PhoneNumber {{ i+1 }}</label>
          <input type="number" name="phone" id="phone" [formControlName]="i" >
          <button (click)="removePhoneNumber(i)" >Remove</button>
        </div>
        <button  (click)="addPhoneNumberField()">Add</button>
      </div>
      <div>
        <button type="submit" [disabled]="!userForm.valid">Submit</button>
      </div>
    </form>
  `,
  styleUrl: './window.component.css'
})
export class WindowComponent {
  userForm! : FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['',
        [
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        ]
      ],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
      }),
      phoneNumbers: this.formBuilder.array([
        this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(/^[+]?[\d\s()-]{7,15}$/)
        ])
      ]),
    })
  }

  onSubmitForm() {
    console.log(this.userForm.value);
    this.userForm.reset();
  }

  get phoneNumbers() : FormArray {
    return this.userForm.get('phoneNumbers') as FormArray;
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  addPhoneNumberField() {
    this.phoneNumbers.push (
      this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[+]?[\d\s()-]{7,15}$/),
      ])
    );
  }
}
