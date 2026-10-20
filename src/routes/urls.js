import { Router } from 'express';
import { createShortUrl } from '../controllers/urlController.js';

const router = Router();

// POST /api/urls -> crea un link corto
router.post('/', createShortUrl);

export default router;