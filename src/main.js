import express from 'express';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';

const app = express();
const PORT = 3000;

// Middleware для парсинга JSON в теле запроса
app.use(express.json());

// Подключаем роуты
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

// Корневой маршрут — для проверки, что сервер жив
app.get('/', (req, res) => {
  res.json({ message: 'API работает. Эндпоинты: /api/products, /api/users, /api/orders' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});