export const errorHandler = (err, _req, res, _next) => {
  const error = { ...err };
  error.message = err.message;

  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    error.message = messages.join(', ');
    error.status = 400;
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const messages = err.errors.map(e => `${e.value} ya existe`);
    error.message = messages.join(', ');
    error.status = 400;
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    error.message = 'Error en referencia a clave foránea';
    error.status = 400;
  }

  if (err.name === 'SequelizeDatabaseError') {
    error.message = 'Error en la base de datos';
    error.status = 500;
  }

  if (!error.status) {
    error.message = 'Ocurrió un error inesperado';
    error.status = 500;
  }

  return res.status(error.status).json({
    message: error.message
  });
};