import { productRepository } from '../../entities/product/repository.js';

export function createProduct({ title, price, description }) {
  // Валидация — бизнес-правило домена
  if (!title || price === undefined) {
    const err = new Error('Нужны поля title и price');
    err.status = 400;
    throw err;
  }

  return productRepository.add({ title, price, description });
}