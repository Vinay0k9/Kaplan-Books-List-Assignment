export interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  categories: string[];
  pageCount: number | null;
  language: string;
  thumbnail: string;
  previewLink: string;
  infoLink: string;
  pdfAvailable: boolean;
  buyLink: string;
  price: {
    amount: number;
    currencyCode: string;
  } | null;
}

export interface BooksResponse {
  kind: string;
  totalItems: number;
  returnedItems: number;
  books: Book[];
  source: string;
}
