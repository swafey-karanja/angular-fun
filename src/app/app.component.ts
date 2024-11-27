import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { AppendPipe } from './pipes/append.pipe';
import { DataService } from './services/data.service';
import { PhotoService } from './services/photo.service';
import { NgFor } from '@angular/common';
import { Person } from './models/person';
import { Posts } from './models/posts';
import { Photos } from './models/photos';

@Component({
  selector: 'app-root',
  imports: [ AppendPipe, NgFor],
  providers: [ DataService, PhotoService ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';

  constructor(private dataService : DataService, private photoService : PhotoService) {}

  name : string = "Ayana";

  data : Person[] = [];
  posts : Posts[] = [];
  photos : Photos[] = [];

  // ngOnInit() {
  //   this.dataService.getPosts().subscribe({
  //     next: (response: Posts[]) => {
  //       this.posts = response;
  //     },
  //     error: (error: Error) => {
  //       console.log("Error", error);
  //     }
  //   })
  // }

  ngOnInit() {
    this.photoService.getPhotos(10).subscribe({
      next: (response: Photos[]) => {
        this.photos = response;
      },
      error: (error : Error) => {
        console.log("Error", error);
      }
    })
  }
}
