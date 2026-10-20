import db from '../db/database.js';
import { generateCode } from '../utils/generateCode.js';

// Verifica que el texto sea una URL válida con http o https
function isValidUrl(value) {
    try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
    return false;
    }
}

export function createShortUrl(req, res) {
    const { url } = req.body ?? {};

    if (typeof url !== 'string' || !isValidUrl(url)) {
    return res
        .status(400)
        .json({ error: 'Se requiere una URL válida (http o https).' });
    }

  // El "?" se completa de forma segura: evita ataques de inyección SQL
    const insert = db.prepare(
    'INSERT INTO urls (code, original_url) VALUES (?, ?)'
    );

  // Reintenta si el código generado ya existiera (muy poco probable)
    for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    try {
        insert.run(code, url);
        return res.status(201).json({
        code,
        shortUrl: `${req.protocol}://${req.get('host')}/${code}`,
        originalUrl: url,
        });
    } catch (error) {
      // Si no es un código repetido, es un error real: lo relanzamos
        if (!String(error.message).includes('UNIQUE')) throw error;
    }
    }

    return res
    .status(500)
    .json({ error: 'No se pudo generar un código único. Intentá de nuevo.' });
}