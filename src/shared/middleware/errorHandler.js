export const errorHandler = (err, req, res, next) => {
  // Ошибки валидации Sequelize → 400
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Ошибка валидации',
      details: err.errors.map((e) => e.message),
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Такая запись уже существует',
      details: err.errors.map((e) => e.message),
    });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Внутренняя ошибка сервера' });
};