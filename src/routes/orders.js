import { Router } from 'express';
import { orderRepository } from '../entities/order/repository.js';
import { createOrder } from '../features/order/createOrder.js';

const router = Router();

// READ ALL
router.get('/', (req, res) => {
  res.json(orderRepository.findAll());
});

// READ ONE
router.get('/:id', (req, res) => {
  const order = orderRepository.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Заказ не найден' });
  res.json(order);
});

// CREATE — валидация в feature
router.post('/', (req, res) => {
  const order = createOrder(req.body);
  res.status(201).json(order);
});

// UPDATE
router.put('/:id', (req, res) => {
  const order = orderRepository.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Заказ не найден' });
  order.update(req.body);
  res.json(order);
});

// DELETE
router.delete('/:id', (req, res) => {
  const deleted = orderRepository.removeById(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Заказ не найден' });
  res.json(deleted);
});

export default router;