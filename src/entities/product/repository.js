import { Product } from './model.js';

export const productRepository = {
  async findAll() {
    return Product.findAll();
  },

  async findById(id) {
    return Product.findByPk(id);
  },

  async add({ title, price, description }) {
    return Product.create({ title, price, description });
  },

  async updateById(id, patch) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.update(patch);
    return product;
  },

  async removeById(id) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return product;
  },
};