import { productRepository } from '../../entities/product/repository.js';

export async function createProduct({ title, price, description }) {
  if (!title || price === undefined) {
    const err = new Error('Нужны поля title и price');
    err.status = 400;
    throw err;
  }
  return productRepository.add({ title, price, description });
}