import { Router } from 'express';
import { db, counters } from '../db.js';
import { User } from '../models/User.js';

const router = Router();

// READ ALL
router.get('/', (req, res) => {
  res.json(db.users);
});

// READ ONE
router.get('/:id', (req, res) => {
  const user = db.users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(user);
});

// CREATE
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Нужны поля name и email' });
  }
  const user = new User({ id: counters.user++, name, email });
  db.users.push(user);
  res.status(201).json(user);
});

// UPDATE
router.put('/:id', (req, res) => {
  const user = db.users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  user.update(req.body);
  res.json(user);
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = db.users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Пользователь не найден' });
  const [deleted] = db.users.splice(index, 1);
  res.json(deleted);
});

export default router;