import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
    });
    service = TestBed.inject(UserService); // Initialize the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Ensure the service is instantiated
  });

  it('getUser should return an observable with user data', (done) => {
    const expectedUser = { name: 'sam', email: 'sam@gmail.com' };

    service.getUser().subscribe((user) => {
      expect(user).toEqual(expectedUser); // Check that the returned value matches
      done(); // Signal the test completion for async calls
    });
  });
});
