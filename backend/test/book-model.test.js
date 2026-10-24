import test from 'node:test';
import assert from 'node:assert/strict';

import responseData from '../src/data/google-books-response.json' with { type: 'json' };
import { mapGoogleBook } from '../src/models/book.model.js';

test('the supplied response contains ten book records', () => {
  assert.equal(responseData.totalItems, 205);
  assert.equal(responseData.items.length, 10);
});

test('maps the title and authors from volumeInfo', () => {
  const book = mapGoogleBook(responseData.items[0]);

  assert.equal(book.id, 'KbxfDwAAQBAJ');
  assert.equal(book.title, 'Official Guide to OET');
  assert.deepEqual(book.authors, ['Kaplan Test Prep']);
});

test('maps publication and book information', () => {
  const book = mapGoogleBook(responseData.items[0]);

  assert.equal(book.publisher, 'Simon and Schuster');
  assert.equal(book.publishedDate, '2018-08-15');
  assert.equal(book.pageCount, 326);
  assert.deepEqual(book.categories, ['Foreign Language Study']);
});

test('converts the thumbnail URL to HTTPS', () => {
  const book = mapGoogleBook(responseData.items[0]);

  assert.ok(book.thumbnail.startsWith('https://'));
});

test('maps preview and details links to HTTPS', () => {
  const book = mapGoogleBook(responseData.items[0]);

  assert.ok(book.previewLink.startsWith('https://'));
  assert.ok(book.infoLink.startsWith('https://'));
});

test('maps PDF availability from accessInfo', () => {
  const book = mapGoogleBook(responseData.items[0]);

  assert.equal(book.pdfAvailable, false);
});

test('uses safe defaults when optional fields are missing', () => {
  const book = mapGoogleBook({ id: 'minimal-book' });

  assert.equal(book.title, 'Untitled book');
  assert.deepEqual(book.authors, []);
  assert.equal(book.publisher, 'Publisher not available');
  assert.equal(book.publishedDate, 'Date not available');
  assert.equal(book.description, '');
  assert.equal(book.thumbnail, '');
  assert.equal(book.pageCount, null);
  assert.equal(book.pdfAvailable, false);
});
