# URL Shortener API

API REST para acortar links y contar cuántos clics recibe cada uno. Hecha con Node.js, Express y SQLite.

## ✨ Funcionalidades

- Crea links cortos con un código aleatorio de 7 caracteres
- Redirige al link original y cuenta cada clic
- Estadísticas de uso por cada link
- Validación de URLs y errores siempre en formato JSON
- Tests automáticos de los endpoints principales

## 🛠️ Tecnologías

- Node.js (módulos ES)
- Express 5
- SQLite mediante el módulo integrado `node:sqlite`
- `node:test` para los tests (sin dependencias extra)

## 📡 Endpoints

| Método | Ruta                    | Descripción                                   |
| ------ | ----------------------- | --------------------------------------------- |
| POST   | `/api/urls`             | Crea un link corto. Body: `{ "url": "https://..." }` |
| GET    | `/:code`                | Redirige (302) al link original y suma un clic |
| GET    | `/api/urls/:code/stats` | Devuelve el link original, los clics y la fecha |
| GET    | `/health`               | Verifica que el servidor responde             |

**Ejemplo: crear un link**

```bash
curl -X POST http://localhost:3000/api/urls \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.wikipedia.org"}'
```

Respuesta (`201 Created`):

```json
{
  "code": "aB3xK9z",
  "shortUrl": "http://localhost:3000/aB3xK9z",
  "originalUrl": "https://www.wikipedia.org"
}
```

**Códigos de estado:** `201` creado, `302` redirección, `400` datos inválidos, `404` no encontrado, `500` error interno.

## 🚀 Cómo correrlo en local

Requisitos: Node.js 22.13 o superior (probado con Node 24).

```bash
git clone https://github.com/NahuelVarelaUtn/url-shortner.git
cd url-shortener
npm install
npm run dev
```

La API queda disponible en `http://localhost:3000`.

## 🧪 Tests

```bash
npm test
```

Los tests usan una base de datos en memoria, así que no tocan tus datos reales.

## 📁 Estructura del proyecto

```
url-shortener/
├── src/
│   ├── app.js            # configuración de Express
│   ├── server.js         # arranque del servidor
│   ├── routes/           # definición de rutas
│   ├── controllers/      # lógica de cada endpoint
│   ├── middlewares/      # manejo de errores y 404
│   ├── db/               # conexión y tabla de la base de datos
│   └── utils/            # generador de códigos
└── tests/                # tests automáticos
```

## 🧠 Decisiones técnicas

- **Redirección 302 (y no 301):** el navegador no la recuerda, así que cada visita pasa por el servidor y se cuenta.
- **Consultas preparadas (`?`):** evitan la inyección SQL.
- **`app.js` separado de `server.js`:** permite probar la app sin levantar un servidor real.
- **Errores centralizados:** la API nunca expone detalles internos al cliente.

## 📌 Próximas mejoras

- [ ] Publicar la API online
- [ ] Migrar de SQLite a PostgreSQL
- [ ] Limitar la cantidad de pedidos por IP (rate limiting)
- [ ] Agregar un frontend simple

## 👤 Autor

**Nahuel**, estudiante de programación.
[GitHub](https://github.com/NahuelVarelaUtn)