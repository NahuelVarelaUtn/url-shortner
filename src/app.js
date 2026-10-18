import express from 'express';

const app = express();

// Permite que la API entienda datos en formato JSON
app.use(express.json());

// Ruta de prueba para verificar que el servidor responde
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;