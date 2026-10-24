import { Router } from 'express';
import {
  downloadBookPdf,
  getBooks,
  viewBookPdf,
} from '../controllers/books.controller.js';

const router = Router();

router.get('/', getBooks);
router.get('/:id/view', viewBookPdf);
router.get('/:id/download', downloadBookPdf);

export default router;
