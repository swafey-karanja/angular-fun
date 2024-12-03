import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WindowComponent } from './window.component';

describe('WindowComponent', () => {
  let component: WindowComponent;
  let fixture: ComponentFixture<WindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [WindowComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize the form with correct structure', () => {
      expect(component.userForm).toBeDefined();
      expect(component.userForm.get('name')).toBeTruthy();
      expect(component.userForm.get('email')).toBeTruthy();
      expect(component.userForm.get('address')).toBeTruthy();
      expect(component.phoneNumbers.length).toBe(1);
    });
  });

  describe('Form Validation', () => {
    it('should validate email correctly', () => {
      const emailControl = component.userForm.get('email');

      // Invalid email tests
      const invalidEmails = ['invalidemail', 'invalid@email', 'test@'];
      invalidEmails.forEach(email => {
        emailControl?.setValue(email);
        expect(emailControl?.valid).toBeFalsy();
      });

      // Valid email test
      emailControl?.setValue('valid@email.com');
      expect(emailControl?.valid).toBeTruthy();
    });

    it('should validate phone numbers', () => {
      const phoneControl = component.phoneNumbers.at(0);

      // Invalid phone number tests
      const invalidPhones = ['abc', '123', '+1234'];
      invalidPhones.forEach(phone => {
        phoneControl.setValue(phone);
        expect(phoneControl.valid).toBeFalsy();
      });

      // Valid phone number tests
      const validPhones = ['+1 (123) 456-7890', '123-456-7890', '(555) 123-4567'];
      validPhones.forEach(phone => {
        phoneControl.setValue(phone);
        expect(phoneControl.valid).toBeTruthy();
      });
    });
  });

  describe('Phone Number Management', () => {
    it('should add phone number field', () => {
      const initialLength = component.phoneNumbers.length;
      component.addPhoneNumberField();
      expect(component.phoneNumbers.length).toBe(initialLength + 1);
    });

    it('should remove phone number field', () => {
      // Add a second phone number
      component.addPhoneNumberField();
      const initialLength = component.phoneNumbers.length;

      // Remove the last phone number
      component.removePhoneNumber(initialLength - 1);
      expect(component.phoneNumbers.length).toBe(initialLength - 1);
    });
  });

  describe('Form Submission', () => {
    it('should log form values and reset form on submit', () => {
      // Spy on console.log
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      // Set valid form values
      component.userForm.setValue({
        name: 'John Doe',
        email: 'john@example.com',
        address: {
          street: '123 Test St',
          city: 'Testville'
        },
        phoneNumbers: ['123-456-7890']
      });

      // Trigger form submission
      component.onSubmitForm();

      // Expectations
      expect(consoleSpy).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        address: {
          street: '123 Test St',
          city: 'Testville'
        },
        phoneNumbers: ['123-456-7890']
      });

      // Verify form is reset
      expect(component.userForm.pristine).toBeTruthy();

      // Restore console.log
      consoleSpy.mockRestore();
    });
  });
});
