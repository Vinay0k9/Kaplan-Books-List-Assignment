import { logger } from '../utils/logger.js';
export function requestLogger(req, res, next) {
 const started = Date.now();
 logger.info('Incoming request', { method: req.method, path: req.originalUrl });
 res.on('finish', () => logger.info('Request completed', {
  method: req.method, path: req.originalUrl, status: res.statusCode, durationMs: Date.now() - started
 }));
 next();
}
