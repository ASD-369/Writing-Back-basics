import { db, counters } from '../../shared/db.js';
import { User } from './model.js';

export const userRepository = {
  findAll() {
    return db.users;
  },

  findById(id) {
    const raw = db.users.find(u => u.id === Number(id));
    if (!raw) return null;
    Object.setPrototypeOf(raw, User.prototype);
    return raw;
  },

  add({ name, email }) {
    const user = new User({
      id: counters.user++,
      name,
      email,
    });
    db.users.push(user);
    return user;
  },

  removeById(id) {
    const index = db.users.findIndex(u => u.id === Number(id));
    if (index === -1) return null;
    const [deleted] = db.users.splice(index, 1);
    return deleted;
  },
};