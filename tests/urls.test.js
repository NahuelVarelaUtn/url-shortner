import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

// Tiene que definirse ANTES de cargar la app, para usar una base en memoria
process.env.DB_PATH = ':memory:';
const { default: app } = await import('../src/app.js');

let server;
let baseUrl;

// Antes de los tests: levantamos la app en un puerto libre
before(() => {
  // Puerto 0 = el sistema elige uno disponible
    server = app.listen(0);
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

// Después de los tests: apagamos el servidor
after(() => {
    server.closeAllConnections();
    server.close();
});

// Función auxiliar: crea un link corto mandando una URL a la API
async function createLink(url) {
    const res = await fetch(`${baseUrl}/api/urls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
    });
    return { res, data: await res.json() };
}

test('POST /api/urls crea un link corto', async () => {
    const { res, data } = await createLink('https://www.wikipedia.org');

    assert.equal(res.status, 201);
    assert.equal(data.code.length, 7);
    assert.equal(data.originalUrl, 'https://www.wikipedia.org');
});

test('POST /api/urls rechaza una URL inválida', async () => {
    const { res, data } = await createLink('esto no es un link');

    assert.equal(res.status, 400);
    assert.ok(data.error);
});

test('GET /:code redirige y suma un clic', async () => {
    const { data } = await createLink('https://example.com/pagina');

  // redirect: 'manual' evita que fetch siga la redirección automáticamente
        const redirect = await fetch(`${baseUrl}/${data.code}`, {
        redirect: 'manual',
    });
    assert.equal(redirect.status, 302);
    assert.equal(redirect.headers.get('location'), 'https://example.com/pagina');

    const statsRes = await fetch(`${baseUrl}/api/urls/${data.code}/stats`);
    const stats = await statsRes.json();
    assert.equal(stats.clicks, 1);
});

test('GET /:code devuelve 404 si el código no existe', async () => {
    const res = await fetch(`${baseUrl}/noexiste`);

    assert.equal(res.status, 404);
});