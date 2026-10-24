import { getBookFile, listBooks } from '../services/books.service.js';
import { logger } from '../utils/logger.js';

// Return the mock PDF catalogue and indicate which files are available.
export async function getBooks(req, res, next) {
  try {
    const query = req.query.q || '';

    const result = await listBooks(query);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// Open the selected PDF in the browser for reading.
export function viewBookPdf(req, res, next) {
  sendBookPdf(req, res, next, false);
}

// Download the selected PDF with its original filename.
export function downloadBookPdf(req, res, next) {
  sendBookPdf(req, res, next, true);
}

function sendBookPdf(req, res, next, asDownload) {
  try {
    const result = getBookFile(req.params.id);

    if (!result) {
      return res.status(404).json({ message: 'Book was not found.' });
    }

    if (!result.exists) {
      return res.status(404).json({
        message: `PDF is missing. Add "${result.book.fileName}" to the backend/books folder.`,
      });
    }

    res.set('Cache-Control', 'no-store');
    logger.info(asDownload ? 'PDF download requested' : 'PDF view requested', {
      bookId: result.book.id,
    });

    if (asDownload) {
      return res.download(result.filePath, result.book.fileName);
    }

    res.type('application/pdf');
    return res.sendFile(result.filePath);
  } catch (error) {
    next(error);
  }
}
