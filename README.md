# AI Memories — готовый сайт (Next.js + Tailwind)

## Запуск
```bash
npm install
npm run dev
```
Откройте http://localhost:3000

## Где менять
- Контакты/кнопки: `app/page.jsx` (WhatsApp номер и т.п.)
- Логотип: `public/logo-hero.jpg` (сейчас взят из вашего файла)
- Звук входа: положите `public/sounds/enter.mp3` и передайте проп `audioSrc="/sounds/enter.mp3"` в компоненте `<EntryOverlay />` в `app/page.jsx`
- Цены/калькулятор: `components/Calculator.jsx` и `components/Pricing.jsx`
- Бэкграунд‑анимация: `components/BackgroundFX.jsx`
- Остальные секции — в папке `components/`

## Сборка
```bash
npm run build
npm start
```
