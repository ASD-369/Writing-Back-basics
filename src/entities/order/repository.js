import { Order } from './model.js';

export const orderRepository = {
  async findAll() {
    return Order.findAll();
  },

  async findById(id) {
    return Order.findByPk(id);
  },

  async add({ userId, total, status }) {
    return Order.create({ userId, total, status });
  },

  async updateById(id, patch) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.update(patch);
    return order;
  },

  async removeById(id) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.destroy();
    return order;
  },
};