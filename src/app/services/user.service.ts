import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUser() : Observable<{ name: string; email: string }> {
    return of({ name: "sam", email: "sam@gmail.com" });
  }

  constructor() { }
}
