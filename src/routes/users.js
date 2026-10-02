import { Router } from 'express';
import { userRepository } from '../entities/user/repository.js';
import { createUser } from '../features/user/createUser.js';

const router = Router();

// READ ALL
router.get('/', (req, res) => {
  res.json(userRepository.findAll());
});

// READ ONE
router.get('/:id', (req, res) => {
  const user = userRepository.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(user);
});

// CREATE — валидация в feature
router.post('/', (req, res) => {
  const user = createUser(req.body);
  res.status(201).json(user);
});

// UPDATE
router.put('/:id', (req, res) => {
  const user = userRepository.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  user.update(req.body);
  res.json(user);
});

// DELETE
router.delete('/:id', (req, res) => {
  const deleted = userRepository.removeById(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(deleted);
});

export default router;