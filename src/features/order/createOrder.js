import { orderRepository } from '../../entities/order/repository.js';

export async function createOrder({ userId, total, status }) {
  if (!userId) {
    const err = new Error('Нужно поле userId');
    err.status = 400;
    throw err;
  }
  return orderRepository.add({ userId, total, status });
}