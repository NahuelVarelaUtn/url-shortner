// Responde 404 cuando ninguna ruta coincide con el pedido
export function notFoundHandler(req, res) {
    res.status(404).json({ error: 'Ruta no encontrada.' });
}

// Manejo centralizado de errores: siempre responde en formato JSON.
// Express reconoce que es un manejador de errores porque tiene 4 parámetros.
export function errorHandler(err, req, res, next) {
  // JSON mal escrito en el cuerpo de la petición
    if (err.type === 'entity.parse.failed') {
        return res
        .status(400)
        .json({ error: 'El cuerpo de la petición no es un JSON válido.' });
    }

  // Cualquier otro error: lo registramos en consola, pero al cliente
  // solo le damos un mensaje genérico (nunca detalles internos)
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
}