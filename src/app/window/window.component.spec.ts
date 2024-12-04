import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WindowComponent } from './window.component';

describe('WindowComponent', () => {
  let component: WindowComponent;
  let fixture: ComponentFixture<WindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WindowComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with one phone number field', () => {
    expect(component.phoneNumbers.length).toBe(1);
  });

  it('should add a phone number field', () => {
    const initialLength = component.phoneNumbers.length;
    component.addPhoneNumberField();
    expect(component.phoneNumbers.length).toBe(initialLength + 1);
  });

  it('should remove a phone number field', () => {
    component.addPhoneNumberField();
    const initialLength = component.phoneNumbers.length;
    component.removePhoneNumber(0);
    expect(component.phoneNumbers.length).toBe(initialLength - 1);
  });

  it('should validate form with valid input', () => {
    component.userForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'Anytown'
      },
      phoneNumbers: ['1234567890']
    });
    expect(component.userForm.valid).toBeTruthy();
  });

  it('should invalidate form with invalid email', () => {
    component.userForm.patchValue({
      name: 'John Doe',
      email: 'invalid-email',
      address: {
        street: '123 Main St',
        city: 'Anytown'
      },
      phoneNumbers: ['1234567890']
    });
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should reset form after submission', () => {
    component.userForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'Anytown'
      },
      phoneNumbers: ['1234567890']
    });
    component.onSubmitForm();
    expect(component.userForm.pristine).toBeTruthy();
  });
});
