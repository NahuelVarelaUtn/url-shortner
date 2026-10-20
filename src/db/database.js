import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';

// Carpeta donde se guarda el archivo de la base de datos
mkdirSync('data', { recursive: true });

const db = new DatabaseSync('data/urls.db');

// Crea la tabla solo si todavía no existe
db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    original_url TEXT NOT NULL,
    clicks INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);

export default db;