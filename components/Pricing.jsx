export default function Pricing(){
  return (
    <section id="pricing" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Пакеты и цены</h2>
      <p className="text-center text-white/70 mb-6">Выберите готовый пакет или оформите индивидуальный расчёт.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-2xl font-semibold">Мини‑ролик</h3>
          <p className="text-white/70 mt-1">до 10 фото</p>
          <div className="mt-4 text-4xl font-bold">4 500 ₽</div>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>• Оживление фото</li>
            <li>• Монтаж и улучшение</li>
            <li>• Песня на ваш выбор</li>
            <li>• 1–2 раунда правок</li>
            <li>• Готовый файл MP4</li>
          </ul>
          <a href="#calculator" className="btn-primary mt-6">Рассчитать с калькулятором</a>
        </div>
        <div className="card">
          <h3 className="text-2xl font-semibold">Полноценный видеоролик</h3>
          <p className="text-white/70 mt-1">от 10 фото</p>
          <div className="mt-4 text-4xl font-bold">от 8 000 ₽</div>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>• Оживление, монтаж, сведение/аранжировка</li>
            <li>• Улучшение качества</li>
            <li>• 1–2 раунда правок</li>
            <li>• Готовый файл MP4</li>
          </ul>
          <a href="#calculator" className="btn-primary mt-6">Рассчитать с калькулятором</a>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="text-xl font-semibold mb-3">Тарифы по фото</h4>
          <ul className="text-white/80 space-y-2">
            <li>• Без песни на заказ — <b>450 ₽/фото</b></li>
            <li>• С песней на заказ — <b>180 ₽/фото</b></li>
            <li>• 1–2 фото — <b>1 350 ₽</b> (оживление 15–30 с, монтаж, улучшение)</li>
          </ul>
        </div>
        <div className="card">
          <h4 className="text-xl font-semibold mb-3">Дополнительно</h4>
          <ul className="text-white/80 space-y-2">
            <li>• Песня под заказ (эксклюзив) — <b>от 3 500 ₽</b></li>
            <li>• Добавление текста (имена, даты) — <b>100 ₽</b></li>
            <li>• Индивидуальный подбор музыки — <b>150 ₽</b></li>
            <li>• Срочное изготовление (24 ч) — <b>+1 000 ₽</b></li>
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-white/60">В цену входит: улучшение фото, анимация/оживление, монтаж, 1–2 раунда правок. Формат — MP4.</p>
    </section>
  );
}
