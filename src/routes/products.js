import { Router } from 'express';
import { productRepository } from '../entities/product/repository.js';
import { createProduct } from '../features/product/createProduct.js';

const router = Router();

// READ ALL — все товары
router.get('/', (req, res) => {
  res.json(productRepository.findAll());
});

// READ ONE — товар по id
router.get('/:id', (req, res) => {
  const product = productRepository.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Товар не найден' });
  res.json(product);
});

// CREATE — создание товара (валидация в feature)
router.post('/', (req, res) => {
  const product = createProduct(req.body);
  res.status(201).json(product);
});

// UPDATE — обновление (findById возвращает ссылку, update меняет объект в массиве)
router.put('/:id', (req, res) => {
  const product = productRepository.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Товар не найден' });
  product.update(req.body);
  res.json(product);
});

// DELETE — удаление
router.delete('/:id', (req, res) => {
  const deleted = productRepository.removeById(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Товар не найден' });
  res.json(deleted);
});

export default router;