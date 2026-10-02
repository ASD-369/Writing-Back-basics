import { orderRepository } from '../../entities/order/repository.js';

export function createOrder({ userId, productIds, total, status }) {
  if (!userId || !productIds) {
    const err = new Error('Нужны поля userId и productIds');
    err.status = 400;
    throw err;
  }

  return orderRepository.add({ userId, productIds, total, status });
}