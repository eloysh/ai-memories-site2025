Инструкция по развертыванию проекта на хостинге reg.ru (Node.js)

Коротко: проект — Next.js (версия указана в package.json). Самый надёжный способ — развернуть как Node.js приложение (npm install, npm run build, npm start) и запустить с process manager (pm2). Ниже шаги, готовые команды и файлы, которые можно положить в архив и отправить на хостинг.

Требования на сервере
- Node.js 18+ (рекомендую 18.x или 20.x)
- npm
- Опционально: pm2 для управления процессом
- Порт, который выделит reg.ru (обычно 3000 или 8080), или настройка обратного прокси (nginx)

Файлы, важные для деплоя
- `package.json` — уже содержит `build` и `start` (next build / next start)
- `.env.example` — пример переменных окружения
- `ecosystem.config.js` — конфиг для pm2 (в комплекте)

Шаги на сервере (передавать весь проект)
1) Загрузите весь проект в выбранную директорию на сервере (scp/ftp/архив).
2) Перейдите в папку проекта:
   cd /path/to/project
3) Установите Node.js (если ещё не установлен) — воспользуйтесь инструкциями reg.ru по установке Node.js (либо nvm).
4) Установите зависимости:
   npm ci
5) Создайте файл окружения (.env) на сервере, например:
   NEXT_PUBLIC_SITE_URL=https://yourdomain.ru
   NODE_ENV=production
6) Соберите приложение:
   npm run build
7) Запустите приложение через pm2 (рекомендуется):
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 status

Если pm2 недоступен, можно запустить в background:
   nohup npm run start -- -p 3000 &
   # или
   PORT=3000 npm run start &

NGINX / прокси
Если reg.ru использует nginx в качестве фронтенда, настройте прокси на порт приложения (например 3000). Пример location:

location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

Проверка
- Откройте URL сайта (ваш домен). Страница должна загружаться.
- Если видите ошибку 404 для статических ассетов, проверьте, что `next start` запущен в production и что `NEXT_PUBLIC_SITE_URL` корректный.

Отладка
- pm2 logs <app-name>
- tail -f /path/to/your/pm2/logs/*
- Проверяйте network/console в браузере

Примечания
- App Router (Next.js app/) использует серверные возможности. `next start` запускает Node.js сервер Next.js — совместимо с хостингом, где есть Node.
- Если вы хотите вместо этого создать статический сайт (next export) — он может не поддерживать все маршруты/функции App Router.

Если хотите, могу подготовить базовый `ecosystem.config.js` и `.env.example` в проекте — скажите, и я добавлю их.