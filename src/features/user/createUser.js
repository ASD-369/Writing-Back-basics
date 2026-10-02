import { userRepository } from '../../entities/user/repository.js';

export async function createUser({ name, email, password }) {
  if (!name || !email || !password) {
    const err = new Error('Нужны поля name, email и password');
    err.status = 400;
    throw err;
  }
  return userRepository.add({ name, email, password });
}