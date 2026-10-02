import { userRepository } from '../../entities/user/repository.js';

export function createUser({ name, email }) {
  if (!name || !email) {
    const err = new Error('Нужны поля name и email');
    err.status = 400;
    throw err;
  }

  return userRepository.add({ name, email });
}