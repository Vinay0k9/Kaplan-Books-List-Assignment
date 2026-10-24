import test from 'node:test';
import assert from 'node:assert/strict';

import { listBooks } from '../src/services/books.service.js';

test('returns books from the supplied JSON response', async () => {
  const result = await listBooks();

  assert.equal(result.source, 'provided-json');
  assert.equal(result.kind, 'books#volumes');
  assert.equal(result.totalItems, 205);
  assert.equal(result.returnedItems, 10);
  assert.equal(result.books.length, 10);
});

test('searches titles without case sensitivity', async () => {
  const result = await listBooks('official guide');

  assert.equal(result.books.length, 1);
  assert.equal(result.books[0].title, 'Official Guide to OET');
});

test('searches book authors and descriptions', async () => {
  const result = await listBooks('Kaplan Test Prep');

  assert.equal(result.books.length, 10);
});

test('returns no books when the search has no match', async () => {
  const result = await listBooks('no-such-book-title');

  assert.deepEqual(result.books, []);
  assert.equal(result.returnedItems, 0);
});

test('supports searching with an empty query', async () => {
  const result = await listBooks('   ');

  assert.equal(result.books.length, 10);
});
