import express from 'express';
import { logger } from './middleware/logger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from '../routes/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function createApp() {
  const app = express();
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, '../../public')));

  app.use(logger);
  app.use(express.json());

  app.post('/echo', (req, res) => {
    res.json(req.body);
  });

  app.get('/', (req, res) => {
    res.json({
      message: 'API работает',
      endpoints: ['/api/products', '/api/users', '/api/orders', '/api/admin', '/echo'],
    });
  });

  app.use('/api', apiRouter);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}