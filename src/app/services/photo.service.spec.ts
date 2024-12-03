import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Photos } from '../models/photos'; // Update the import path if necessary

describe('PhotoService', () => {
  let service: PhotoService;
  let httpTestingController: HttpTestingController;

  const mockPhotos: Photos[] = [
    { id: 1, albumId: 1, title: 'Photo 1', url: 'http://example.com/1', thumbnailUrl: 'http://example.com/thumb1' },
    { id: 2, albumId: 1, title: 'Photo 2', url: 'http://example.com/2', thumbnailUrl: 'http://example.com/thumb2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService],
    });

    service = TestBed.inject(PhotoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no unmatched HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch photos with a specified limit', () => {
    const limit = 5;

    service.getPhotos(limit).subscribe((photos) => {
      expect(photos).toEqual(mockPhotos);
      expect(photos.length).toBe(mockPhotos.length);
    });

    const req = httpTestingController.expectOne(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos); // Respond with mock data
  });

  it('should handle errors gracefully', () => {
    const limit = 5;

    service.getPhotos(limit).subscribe({
      next: () => fail('Expected error, but got success response'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpTestingController.expectOne(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' }); // Respond with error
  });
});
