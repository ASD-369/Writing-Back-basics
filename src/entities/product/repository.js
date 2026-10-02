import { db, counters } from '../../shared/db.js';
import { Product } from './model.js';

export const productRepository = {
  findAll() {
    return db.products;
  },

  findById(id) {
    const raw = db.products.find(p => p.id === Number(id));
    if (!raw) return null;
    Object.setPrototypeOf(raw, Product.prototype);
    return raw;
  },

  add({ title, price, description }) {
    const product = new Product({
      id: counters.product++,
      title,
      price,
      description,
    });
    db.products.push(product);
    return product;
  },

  removeById(id) {
    const index = db.products.findIndex(p => p.id === Number(id));
    if (index === -1) return null;
    const [deleted] = db.products.splice(index, 1);
    return deleted;
  },
};