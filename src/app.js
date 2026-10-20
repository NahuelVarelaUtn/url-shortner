import express from 'express';
import urlsRouter from './routes/urls.js';

const app = express();

// Permite que la API entienda datos en formato JSON
app.use(express.json());

// Ruta de prueba para verificar que el servidor responde
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Todas las rutas de links viven bajo /api/urls
app.use('/api/urls', urlsRouter);

export default app;