export const notFound = (req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
};