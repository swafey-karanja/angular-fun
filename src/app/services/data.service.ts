import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from "../models/posts";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private postsUrl = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}

  getPosts() : Observable<Posts[]> {
    return this.http.get<Posts[]>(this.postsUrl);
  }

  getData () {
    return [
      { id: 1, name: 'John' , age: 36, gender: 'male' },
      { id: 2, name: 'Jane' , age: 24, gender: 'female' },
      { id: 3, name: 'Mike' ,age:28, gender: 'male' },
    ];
  }

}
