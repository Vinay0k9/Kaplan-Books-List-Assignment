import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

app.listen(env.port, () => {
  logger.info('Backend started', {
    port: env.port,
    environment: env.nodeEnv,
  });
});
