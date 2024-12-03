import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { PhotoService } from './services/photo.service';
import { UserService } from './services/user.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from './models/todo';
import { Photos } from './models/photos';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockDataService: jest.Mocked<DataService>;
  let mockPhotoService: jest.Mocked<PhotoService>;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(async () => {
    // Create mock services
    mockDataService = {
      getPosts: jest.fn()
    } as any;

    mockPhotoService = {
      getPhotos: jest.fn()
    } as any;

    mockUserService = {
      getUser: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [AppComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: PhotoService, useValue: mockPhotoService },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties set correctly', () => {
    expect(component.title).toBe('angular-app');
    expect(component.name).toBe('Ayana');
    expect(component.todos()).toEqual([]);
    expect(component.newTodoText()).toBe('');
  });

  describe('User Service', () => {
    it('should call getUser on ngOnInit', () => {
      const mockUser = { name: 'Test User', email: 'test@example.com' };
      mockUserService.getUser.mockReturnValue(of(mockUser));

      fixture.detectChanges(); // triggers ngOnInit

      expect(mockUserService.getUser).toHaveBeenCalled();
    });
  });

  describe('Photo Service', () => {
    it('should fetch photos successfully', () => {
      const mockPhotos: Photos[] = [
        { id: 1, albumId: 101, title: 'Photo 1', url: 'http://example.com/1', thumbnailUrl: 'http://example.com/thumb1' },
        { id: 2, albumId: 102, title: 'Photo 2', url: 'http://example.com/2', thumbnailUrl: 'http://example.com/thumb2' }
      ];
      mockPhotoService.getPhotos.mockReturnValue(of(mockPhotos));

      const consoleSpy = jest.spyOn(console, 'log');

      component.fetchPhotos();

      expect(mockPhotoService.getPhotos).toHaveBeenCalledWith(5);
      expect(component.photos).toEqual(mockPhotos);
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Error'));
    });

    it('should handle photo fetch error', () => {
      const mockError = new Error('Photo fetch failed');
      mockPhotoService.getPhotos.mockReturnValue(throwError(() => mockError));

      const consoleSpy = jest.spyOn(console, 'log');

      component.fetchPhotos();

      expect(mockPhotoService.getPhotos).toHaveBeenCalledWith(5);
      expect(consoleSpy).toHaveBeenCalledWith('Error', mockError);
    });
  });

  describe('Posts Service', () => {
    it('should fetch posts successfully', () => {
      const mockPosts = [
        { userId:1, id: 1, title: 'Post 1', body: 'Body 1' },
        { userId:12, id: 2, title: 'Post 2', body: 'Body 2' }
      ];
      mockDataService.getPosts.mockReturnValue(of(mockPosts));

      const consoleSpy = jest.spyOn(console, 'log');

      component.fetchData();

      expect(mockDataService.getPosts).toHaveBeenCalled();
      expect(component.posts).toEqual(mockPosts);
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Error'));
    });

    it('should handle post fetch error', () => {
      const mockError = new Error('Post fetch failed');
      mockDataService.getPosts.mockReturnValue(throwError(() => mockError));

      const consoleSpy = jest.spyOn(console, 'log');

      component.fetchData();

      expect(mockDataService.getPosts).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Error', mockError);
    });
  });

  // describe('Todo Signals', () => {
  //   it('should update newTodoText on input', () => {
  //     const mockEvent = {
  //       target: { value: 'New todo item' }
  //     } as unknown as Event;

  //     component.handleInput(mockEvent);

  //     expect(component.newTodoText()).toBe('New todo item');
  //   });

  //   it('should add todo when addTodo is called with non-empty text', () => {
  //     component.newTodoText.set('Test Todo');

  //     component.addTodo();

  //     const todos = component.todos();
  //     expect(todos.length).toBe(1);
  //     expect(todos[0].text).toBe('Test Todo');
  //     expect(todos[0].completed).toBe(false);
  //     expect(component.newTodoText()).toBe('');
  //   });

  //   it('should not add todo with empty text', () => {
  //     component.newTodoText.set('   ');

  //     component.addTodo();

  //     expect(component.todos().length).toBe(0);
  //   });

  //   it('should delete todo by id', () => {
  //     // Add two todos first
  //     const todo1: Todo = { id: 1, text: 'Todo 1', completed: false };
  //     const todo2: Todo = { id: 2, text: 'Todo 2', completed: false };
  //     component.todos.set([todo1, todo2]);

  //     // Delete the first todo
  //     component.deleteTodo(1);

  //     const todos = component.todos();
  //     expect(todos.length).toBe(1);
  //     expect(todos[0]).toEqual(todo2);
  //   });
  // });
});
