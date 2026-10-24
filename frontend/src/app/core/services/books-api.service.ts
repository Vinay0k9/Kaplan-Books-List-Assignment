import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BooksResponse } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BooksApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/books';

  getBooks(query = ''): Observable<BooksResponse> {
    const params = new HttpParams().set('q', query);
    return this.http.get<BooksResponse>(this.apiUrl, { params });
  }
}
