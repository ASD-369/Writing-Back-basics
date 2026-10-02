import { User } from './user/model.js';
import { Product } from './product/model.js';
import { Order } from './order/model.js';

// Пользователь много заказов
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Заказ много товаров (many-to-many)
Order.belongsToMany(Product, { through: 'OrderItems', as: 'products' });
Product.belongsToMany(Order, { through: 'OrderItems', as: 'orders' });

export { User, Product, Order };