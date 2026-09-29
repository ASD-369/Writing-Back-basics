import express from 'express';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';
import { logger } from './middlewares/logger.js';
import { requireAuth } from './middlewares/requireAuth.js';

const app = express();
const PORT = 3000;

// 1. Логгер — первым, видит все запросы
app.use(logger);

// 2. Парсер JSON — до маршрутов
app.use(express.json());

// 3. POST /echo — возвращает тело обратно
app.post('/echo', (req, res) => {
  res.json(req.body);
});

// 4. GET /admin — защищён requireAuth ТОЛЬКО на этом маршруте
app.get('/admin', requireAuth, (req, res) => {
  res.json({ message: 'Добро пожаловать в админ-панель' });
});

// 5. Основные API-роуты
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

// 6. Корневой маршрут
app.get('/', (req, res) => {
  res.json({ message: 'API работает. Эндпоинты: /api/products, /api/users, /api/orders' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});