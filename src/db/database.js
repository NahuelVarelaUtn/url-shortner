import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';

// En los tests se usa ":memory:" (base temporal) para no tocar los datos reales
const dbPath = process.env.DB_PATH ?? 'data/urls.db';

if (dbPath !== ':memory:') {
  // Carpeta donde se guarda el archivo de la base de datos
    mkdirSync('data', { recursive: true });
}

const db = new DatabaseSync(dbPath);

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