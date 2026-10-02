import { sequelize } from './shared/sequelize.js';
import './entities/index.js'; // регистрирует модели и ассоциации
import { createApp } from './app/createApp.js';

const PORT = 3000;

async function start() {
  await sequelize.authenticate(); // проверяем, что БД доступна
  await sequelize.sync();         // создаём таблицы, если их нет
  console.log('База данных подключена');

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Ошибка запуска:', err);
  process.exit(1);
});