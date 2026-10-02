import { Router } from 'express';
import { userRepository } from '../entities/user/repository.js';
import { createUser } from '../features/user/createUser.js';

const router = Router();

router.get('/', async (req, res) => {
  res.json(await userRepository.findAll());
});

router.get('/:id', async (req, res) => {
  const user = await userRepository.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(user);
});

router.post('/', async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
  const user = await userRepository.updateById(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  const deleted = await userRepository.removeById(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(deleted);
});

export default router;