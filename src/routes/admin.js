import { Router } from 'express';
import { requireAuth } from '../shared/middleware/requireAuth.js';

const router = Router();

router.get('/', requireAuth, (req, res) => {
  res.json({ message: 'Добро пожаловать в админ-панель' });
});

export default router;