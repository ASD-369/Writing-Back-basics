import { Product } from './models/Product.js';
import { User } from './models/User.js';
import { Order } from './models/Order.js';

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