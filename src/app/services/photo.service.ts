import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photos } from '../models/photos';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photosUrl = "https://jsonplaceholder.typicode.com/photos"

  constructor(private http: HttpClient) { }

  getPhotos(limit: number) : Observable<Photos[]> {
    return this.http.get<Photos[]>(`${this.photosUrl}?_limit=${limit}`);
  }
}
