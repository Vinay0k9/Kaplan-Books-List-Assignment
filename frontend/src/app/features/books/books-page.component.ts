import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Subject,
  catchError,
  debounceTime,
  of,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';

import { Book, BooksResponse } from '../../core/models/book.model';
import { BooksApiService } from '../../core/services/books-api.service';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css',
})
export class BooksPageComponent implements OnInit, OnDestroy {
  private readonly api = inject(BooksApiService);
  private readonly searchInput = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  books: Book[] = [];
  searchTerm = '';
  isLoading = true;
  errorMessage = '';
  dataSource = '';
  totalItems = 0;

  ngOnInit(): void {
    this.searchInput
      .pipe(
        startWith(''),
        debounceTime(200),
        switchMap((query) => {
          this.isLoading = true;
          this.errorMessage = '';

          return this.api.getBooks(query).pipe(
            catchError(() => {
              this.errorMessage =
                'Could not load the book list. Please check that the backend is running.';
              return of(null);
            }),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((response: BooksResponse | null) => {
        this.isLoading = false;

        if (!response) {
          this.books = [];
          this.dataSource = '';
          this.totalItems = 0;
          return;
        }

        this.books = response.books ?? [];
        this.dataSource = response.source ?? '';
        this.totalItems = response.totalItems ?? this.books.length;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchInput.complete();
  }

  onSearchChange(): void {
    this.searchInput.next(this.searchTerm.trim());
  }

  getInitials(title: string): string {
    return title
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }

  trackById(_index: number, book: Book): string {
    return book.id;
  }
}
