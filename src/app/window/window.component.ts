import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-window',
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './window.component.html',
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
