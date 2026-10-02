// src/shared/db.js

// ⚠️ Отступление от FSD: shared импортирует из entities.
// Это сделано осознанно, чтобы сохранить работу с классами.
// Единственный файл в shared, которому это разрешено.

import { Product } from '../entities/product/model.js';
import { User } from '../entities/user/model.js';
import { Order } from '../entities/order/model.js';

export const db = {
  products: [
    new Product({ id: 1, title: 'Ноутбук', price: 75000, description: 'Игровой' }),
    new Product({ id: 2, title: 'Мышь', price: 1500, description: 'Беспроводная' }),
  ],
  users: [
    new User({ id: 1, name: 'Никита', email: 'nikita@example.com' }),
  ],
  orders: [
    new Order({ id: 1, userId: 1, productIds: [1, 2], total: 76500, status: 'new' }),
  ],
};

export const counters = {
  product: 3,
  user: 2,
  order: 2,
};