import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { BooksResponse } from '../../core/models/book.model';
import { BooksApiService } from '../../core/services/books-api.service';
import { BooksPageComponent } from './books-page.component';

const sampleResponse: BooksResponse = {
  kind: 'books#volumes',
  totalItems: 205,
  returnedItems: 2,
  source: 'provided-json',
  books: [
    {
      id: 'book-one',
      title: 'Official Guide to OET',
      subtitle: '',
      authors: ['Kaplan Test Prep'],
      publisher: 'Simon and Schuster',
      publishedDate: '2018-08-15',
      description: 'A guide for exam preparation.',
      categories: ['Foreign Language Study'],
      pageCount: 326,
      language: 'en',
      thumbnail: 'https://example.com/cover.jpg',
      previewLink: 'https://example.com/preview',
      infoLink: 'https://example.com/details',
      pdfAvailable: false,
      buyLink: '',
      price: null,
    },
    {
      id: 'book-two',
      title: 'SAT Reading & Writing Prep',
      subtitle: 'Practice Questions',
      authors: ['Kaplan Test Prep'],
      publisher: 'Simon and Schuster',
      publishedDate: '2020-08-04',
      description: '',
      categories: ['Study Aids'],
      pageCount: 181,
      language: 'en',
      thumbnail: '',
      previewLink: '',
      infoLink: '',
      pdfAvailable: false,
      buyLink: '',
      price: null,
    },
  ],
};

describe('BooksPageComponent', () => {
  let getBooksSpy: jasmine.Spy;

  beforeEach(async () => {
    getBooksSpy = jasmine.createSpy('getBooks').and.returnValue(of(sampleResponse));

    await TestBed.configureTestingModule({
      imports: [BooksPageComponent],
      providers: [
        {
          provide: BooksApiService,
          useValue: { getBooks: getBooksSpy },
        },
      ],
    }).compileComponents();
  });

  it('creates the page', () => {
    const fixture = TestBed.createComponent(BooksPageComponent);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads and displays books from the supplied JSON response', fakeAsync(() => {
    const fixture = TestBed.createComponent(BooksPageComponent);

    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();

    expect(getBooksSpy).toHaveBeenCalledWith('');
    expect(fixture.componentInstance.books.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Official Guide to OET');
    expect(fixture.nativeElement.textContent).toContain('SAT Reading & Writing Prep');
  }));

  it('shows the empty state when no books match', fakeAsync(() => {
    getBooksSpy.and.returnValue(of({
      ...sampleResponse,
      books: [],
      returnedItems: 0,
    }));

    const fixture = TestBed.createComponent(BooksPageComponent);

    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No books found');
  }));

  it('shows an error message when the API request fails', fakeAsync(() => {
    getBooksSpy.and.returnValue(throwError(() => new Error('Request failed')));

    const fixture = TestBed.createComponent(BooksPageComponent);

    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();

    expect(fixture.componentInstance.errorMessage).toContain('Could not load the book list');
  }));

  it('creates initials from a book title', () => {
    const fixture = TestBed.createComponent(BooksPageComponent);

    expect(fixture.componentInstance.getInitials('Official Guide to OET')).toBe('OG');
  });
});
