import { User } from './model.js';

export const userRepository = {
  async findAll() {
    return User.findAll();
  },

  async findById(id) {
    return User.findByPk(id);
  },

  async add({ name, email, password }) {
    return User.create({ name, email, password });
  },

  async updateById(id, patch) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(patch);
    return user;
  },

  async removeById(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
  },
};