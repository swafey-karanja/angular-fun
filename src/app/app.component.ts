import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppendPipe } from './pipes/append.pipe';
import { DataService } from './services/data.service';
import { PhotoService } from './services/photo.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Person } from './models/person';
import { Posts } from './models/posts';
import { Photos } from './models/photos';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { Todo } from './models/todo';
import { WindowComponent } from "./window/window.component";

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterLink, AppendPipe, NgFor, NgIf, AsyncPipe],
  providers: [ DataService, PhotoService, UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';

  constructor(private dataService : DataService, private photoService : PhotoService, private userService : UserService) {}

  name : string = "Ayana";

  data : Person[] = [];
  posts : Posts[] = [];
  photos : Photos[] = [];
  user!: Observable<{ name: string; email: string; }>;

  ngOnInit() {
    // async and json pipes
    this.user = this.userService.getUser();
  }

  fetchPhotos () : void {
    this.photoService.getPhotos(5).subscribe({
      next: (response: Photos[]) => {
        this.photos = response;
      },
      error: (error: Error) => {
        console.log("Error", error);
      }
    })
  }

  fetchData () : void {
    this.dataService.getPosts().subscribe({
      next: (response: Posts[]) => {
        this.posts = response;
      },
      error: (error: Error) => {
        console.log("Error", error);
      }
    })
  }

  //
  //
  // Angular signals //

  todos = signal<Todo[]>([]);
  newTodoText = signal<string>('');

  handleInput(event: Event) {
    const input = event?.target as HTMLInputElement;
    this.newTodoText.set(input?.value);
  }

  addTodo() {
    if(this.newTodoText().trim().length) {
      const newTodoItem : Todo = {
        id: Date.now(),
        text : this.newTodoText(),
        completed: false
      }
      this.todos.set([...this.todos(), newTodoItem]);
      this.newTodoText.set('');
    }
  }


  deleteTodo(id: number) {
    const updatedTodoList = this.todos().filter((todo) => todo.id !== id);
    this.todos.set(updatedTodoList);
  }

}
