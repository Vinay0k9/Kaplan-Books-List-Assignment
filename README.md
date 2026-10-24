# Books List Application

A simple Angular and Node.js/Express application that displays books from the Google Books JSON response supplied for the assignment. The backend maps the response into a consistent format, and the frontend supports searching, book previews, and book-detail links.

## API Details

The supplied response is stored in `backend/src/data/google-books-response.json`. It contains 10 book records and reports `totalItems: 205`. The application uses the included response file, so it does not need a Google API key or a live Google Books API request.

- `GET /api/books` — returns the supplied books.
- `GET /api/books?q=sat` — searches the included records by title, author, publisher, description, and category.
- `GET /api/health` — checks backend status.

The book preview and detail links open the URLs included in the supplied JSON response. They do not provide a downloadable full PDF unless the source data explicitly offers one.

## Run Locally

Requires Node.js 20 or newer and npm.

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend, in a separate terminal:

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.

Run backend tests:

```bash
cd backend
npm test
```



## Run with Docker

From the project root:

```bash
docker compose up --build
```

Open `http://localhost:4200`. Stop the containers with:

```bash
docker compose down
```
