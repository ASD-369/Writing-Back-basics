import { Router } from 'express';
import { db, counters } from '../db.js';
import { Product } from '../models/Product.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(db.products);
});

router.get('/:id', (req, res) => {
  const product = db.products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Товар не найден' });
  res.json(product);
});

router.post('/', (req, res) => {
  const { title, price, description } = req.body;
  if (!title || price === undefined) {
    return res.status(400).json({ error: 'Нужны поля title и price' });
  }
  const product = new Product({
    id: counters.product++,
    title,
    price,
    description,
  });
  db.products.push(product);
  res.status(201).json(product);
});

// UPDATE — обновить товар
router.put('/:id', (req, res) => {
  const product = db.products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Товар не найден' });
  product.update(req.body);
  res.json(product);
});

// DELETE — удалить товар
router.delete('/:id', (req, res) => {
  const index = db.products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Товар не найден' });
  const [deleted] = db.products.splice(index, 1);
  res.json(deleted);
});

export default router;