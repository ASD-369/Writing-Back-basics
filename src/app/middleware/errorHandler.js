import express from 'express';
import { logger } from './middleware/logger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from '../routes/index.js';

export function createApp() {
  const app = express();

  // 1. Логгер — первым
  app.use(logger);

  // 2. Парсер JSON — до маршрутов
  app.use(express.json());

  // 3. Учебный /echo
  app.post('/echo', (req, res) => {
    res.json(req.body);
  });

  // 4. Корневой маршрут-справка
  app.get('/', (req, res) => {
    res.json({
      message: 'API работает',
      endpoints: ['/api/products', '/api/users', '/api/orders', '/api/admin', '/echo'],
    });
  });

  // 5. Все API-роуты — одним махом
  app.use('/api', apiRouter);

  // 6. 404 — после всех маршрутов
  app.use(notFound);

  // 7. Обработчик ошибок — самым последним
  app.use(errorHandler);

  return app;
}