import { logger } from '../utils/logger.js';
export function errorHandler(error, req, res, next) {
 logger.error('Unhandled request error', { path: req.originalUrl, message: error.message });
 res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong. Please try again.' });
}
