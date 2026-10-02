import { db, counters } from '../../shared/db.js';
import { Order } from './model.js';

export const orderRepository = {
  findAll() {
    return db.orders;
  },

  findById(id) {
    const raw = db.orders.find(o => o.id === Number(id));
    if (!raw) return null;
    Object.setPrototypeOf(raw, Order.prototype);
    return raw;
  },

  add({ userId, productIds, total, status }) {
    const order = new Order({
      id: counters.order++,
      userId,
      productIds,
      total,
      status,
    });
    db.orders.push(order);
    return order;
  },

  removeById(id) {
    const index = db.orders.findIndex(o => o.id === Number(id));
    if (index === -1) return null;
    const [deleted] = db.orders.splice(index, 1);
    return deleted;
  },
};