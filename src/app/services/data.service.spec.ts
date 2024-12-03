import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Posts } from '../models/posts';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  const mockPosts : Posts[] = [
    {userId: 1, id: 1, title: 'Hello', body:'testing coming along well'},
    {userId: 2, id: 2, title: 'Fuck', body:'testing coming along well'},
    {userId: 3, id: 3, title: 'Love', body:'testing coming along well'}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataService);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no unmatched HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts succesfully', () => {
    service.getPosts().subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPosts);
  });

  it('should handle errors gracefully', () => {
    service.getPosts().subscribe({
      next: () => fail('expected an error but retuened a success message'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    })

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPosts);
  });
});
