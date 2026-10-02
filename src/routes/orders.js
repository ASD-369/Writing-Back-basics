import { Router } from 'express';
import { orderRepository } from '../entities/order/repository.js';
import { createOrder } from '../features/order/createOrder.js';

const router = Router();

router.get('/', async (req, res) => {
  res.json(await orderRepository.findAll());
});

router.get('/:id', async (req, res) => {
  const order = await orderRepository.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Заказ не найден' });
  res.json(order);
});

router.post('/', async (req, res) => {
  const order = await createOrder(req.body);
  res.status(201).json(order);
});

router.put('/:id', async (req, res) => {
  const order = await orderRepository.updateById(req.params.id, req.body);
  if (!order) return res.status(404).json({ error: 'Заказ не найден' });
  res.json(order);
});

router.delete('/:id', async (req, res) => {
  const deleted = await orderRepository.removeById(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Заказ не найден' });
  res.json(deleted);
});

export default router;