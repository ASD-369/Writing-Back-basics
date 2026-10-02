import { Router } from 'express';
import { productRepository } from '../entities/product/repository.js';
import { createProduct } from '../features/product/createProduct.js';

const router = Router();

router.get('/', async (req, res) => {
  res.json(await productRepository.findAll());
});

router.get('/:id', async (req, res) => {
  const product = await productRepository.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Товар не найден' });
  res.json(product);
});

router.post('/', async (req, res) => {
  const product = await createProduct(req.body);
  res.status(201).json(product);
});

router.put('/:id', async (req, res) => {
  const product = await productRepository.updateById(req.params.id, req.body);
  if (!product) return res.status(404).json({ error: 'Товар не найден' });
  res.json(product);
});

router.delete('/:id', async (req, res) => {
  const deleted = await productRepository.removeById(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Товар не найден' });
  res.json(deleted);
});

export default router;