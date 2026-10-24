import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import responseData from '../data/google-books-response.json' with { type: 'json' };
import { mockBooks } from '../data/mock-books.js';
import { mapGoogleBook } from '../models/book.model.js';
import { logger } from '../utils/logger.js';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const booksDirectory = path.resolve(currentDirectory, '../../books');

const suppliedBooks = (responseData.items || []).map(mapGoogleBook);

/**
 * Search the books contained in the JSON response supplied for the assignment.
 * The attached response contains 10 records, although totalItems is 205.
 */
export async function listBooks(query = '') {
  const searchText = String(query).trim().toLowerCase();

  const books = suppliedBooks.filter((book) => {
    if (!searchText) {
      return true;
    }

    const searchableText = [
      book.title,
      book.subtitle,
      book.publisher,
      book.description,
      ...book.authors,
      ...book.categories,
    ].join(' ').toLowerCase();

    return searchableText.includes(searchText);
  });

  logger.info('Supplied Google Books JSON loaded', {
    query: searchText,
    count: books.length,
  });

  return {
    kind: responseData.kind || 'books#volumes',
    totalItems: responseData.totalItems || suppliedBooks.length,
    returnedItems: books.length,
    books,
    source: 'provided-json',
  };
}

/**
 * Look up a local demo PDF using a fixed catalogue ID.
 * The ID is never used directly to construct a file path.
 */
export function getBookFile(bookId) {
  const book = mockBooks.find((item) => item.id === bookId);

  if (!book) {
    return null;
  }

  const filePath = path.join(booksDirectory, book.fileName);

  return {
    book,
    filePath,
    exists: fs.existsSync(filePath),
  };
}
