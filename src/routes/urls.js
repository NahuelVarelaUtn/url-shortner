import { Router } from 'express';
import { createShortUrl, getStats } from '../controllers/urlController.js';

const router = Router();

// POST /api/urls -> crea un link corto
router.post('/', createShortUrl);

// GET /api/urls/:code/stats -> estadísticas de un link
router.get('/:code/stats', getStats);

export default router;