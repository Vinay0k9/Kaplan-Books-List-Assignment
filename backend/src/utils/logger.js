import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Write application logs to backend/logs/app.log, not to the terminal.
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const logDirectory = path.resolve(currentDir, '../../logs');
const logFile = path.join(logDirectory, 'app.log');

// Create the logs directory automatically when the backend starts.
fs.mkdirSync(logDirectory, { recursive: true });

function writeLog(level, message, details = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...details
  };

  // JSON Lines format: one log event per line, appended to the file.
  fs.appendFile(logFile, JSON.stringify(entry) + '\n', (error) => {
    if (error) {
      // Only report logger failures to stderr; application logs remain file-based.
      process.stderr.write(`Could not write application log file: ${error.message}\n`);
    }
  });
}

export const logger = {
  info: (message, details) => writeLog('INFO', message, details),
  warn: (message, details) => writeLog('WARN', message, details),
  error: (message, details) => writeLog('ERROR', message, details)
};
