export const errorHandler = (err, _req, res, _next) => {
  console.log(err.name);
  const error = { ...err };
  error.message = err.message;
  error.status = err.status

  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors).map((val) => val.message);
    error.status = 400;
  }

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
    status: error.status,
    message: error.message
  });
};