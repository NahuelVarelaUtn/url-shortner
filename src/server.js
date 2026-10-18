import app from './app.js';

// En producción el puerto lo define el servidor; en local usamos 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});