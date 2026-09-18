import { Router } from 'express';
import { db, counters } from '../db.js';
import { Order } from '../models/Order.js';

const router = Router();

// READ ALL
router.get('/', (req, res) => {
  res.json(db.orders);
});

// READ ONE
router.get('/:id', (req, res) => {
  const order = db.orders.find(o => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Заказ не найден' });
  res.json(order);
});

// CREATE
router.post('/', (req, res) => {
  const { userId, productIds, total, status } = req.body;
  if (!userId || !productIds) {
    return res.status(400).json({ error: 'Нужны поля userId и productIds' });
  }
  const order = new Order({
    id: counters.order++,
    userId,
    productIds,
    total,
    status,
  });
  db.orders.push(order);
  res.status(201).json(order);
});

// UPDATE
router.put('/:id', (req, res) => {
  const order = db.orders.find(o => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Заказ не найден' });
  order.update(req.body);
  res.json(order);
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = db.orders.findIndex(o => o.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Заказ не найден' });
  const [deleted] = db.orders.splice(index, 1);
  res.json(deleted);
});

export default router;