import express from 'express';
import cors from 'cors';
import booksRoutes from './routes/books.routes.js';
import healthRoutes from './routes/health.routes.js';
import { requestLogger } from './middleware/request-logger.js';
import { errorHandler } from './middleware/error-handler.js';
const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
// Keep API responses fresh and avoid browser cache validation returning 304.
app.disable('etag');
app.use(requestLogger);
app.get('/', (req, res) => res.json({ message: 'Books Catalog API is running' }));
app.use('/api/books', booksRoutes);
app.use('/api/health', healthRoutes);
app.use((req, res) => res.status(404).json({ error: 'NOT_FOUND', message: 'Route not found' }));
app.use(errorHandler);
export default app;
