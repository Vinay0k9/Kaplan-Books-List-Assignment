import { Component } from '@angular/core';
import { BooksPageComponent } from './features/books/books-page.component';
@Component({ selector: 'app-root', standalone: true, imports: [BooksPageComponent], template: '<app-books-page />' })
export class AppComponent {}
