import express from 'express';
import urlsRouter from './routes/urls.js';
import { redirectToOriginal } from './controllers/urlController.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Permite que la API entienda datos en formato JSON
app.use(express.json());

// Ruta de prueba para verificar que el servidor responde
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Todas las rutas de links viven bajo /api/urls
app.use('/api/urls', urlsRouter);

// IMPORTANTE: esta ruta va al final de las rutas. Si estuviera más arriba,
// "/health" y "/api" se confundirían con un código corto.
app.get('/:code', redirectToOriginal);

// Siempre al final de todo: primero el 404 y después el manejador de errores
app.use(notFoundHandler);
app.use(errorHandler);

export default app;