"use client";
import React, { useRef, useState, useEffect } from "react";

/** Палитра WhatsApp */
const WA_GREEN  = "#dcf8c6";   // исходящие (наши)
const WA_HEADER = "#075E54";   // шапка чата

/** Данные: 5 мини-диалогов (клиент -> ваш ответ) */
const slides = [
  {
    name: "Анна",
    convo: [
      { side: "in",  time: "10:24", text: "Получилось очень трогательно! Мама расплакалась, когда увидела, как фото оживают. Спасибо ❤️" },
      { side: "out", time: "10:26", text: "Анна, очень рады, что понравилось! Если захотите, сделаем расширенную версию с вашей песней." },
    ],
  },
  {
    name: "Игорь",
    convo: [
      { side: "in",  time: "11:03", text: "Круто восстановили старые снимки. Цвет и чёткость — огонь! Закажем ролик на 15 фото." },
      { side: "out", time: "11:05", text: "Супер! Подготовьте фото, мы соберём историю и предложим 2 варианта музыки." },
    ],
  },
  {
    name: "Наталья",
    convo: [
      { side: "in",  time: "13:19", text: "Песня легла идеально, эмоции живые. Видео пересматриваем всей семьёй 😊" },
      { side: "out", time: "13:20", text: "Спасибо! Можем добавить титры с датами и короткую озвучку-поздравление." },
    ],
  },
  {
    name: "Олег",
    convo: [
      { side: "in",  time: "15:47", text: "Нужно было срочно за сутки — вы спасли! Всё аккуратно и со вкусом." },
      { side: "out", time: "15:49", text: "Рады помочь! Для скорости можем заранее наметить сценарий и референсы музыки." },
    ],
  },
  {
    name: "Марина",
    convo: [
      { side: "in",  time: "18:02", text: "Спасибо за внимательность к деталям — и текст, и переходы, и эмоции на фото. Лучший подарок 🎁" },
      { side: "out", time: "18:04", text: "Марина, благодарим за тёплые слова! Будем рады новым историям вашей семьи." },
    ],
  },
];

/** Иконки */
function DoubleTick({ read = true }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
      <path d="M1 6l3 3 5-7" fill="none" stroke={read ? "#34B7F1" : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9l2 2 6-9" fill="none" stroke={read ? "#34B7F1" : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Avatar({ name }) {
  const letter = (name || "?").slice(0, 1).toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full grid place-items-center text-white text-sm font-medium"
         style={{ background: "linear-gradient(135deg,#60a5fa,#22d3ee)" }}>
      {letter}
    </div>
  );
}

/** Пузырь сообщения */
function Bubble({ msg }) {
  const incoming = msg.side !== "out";
  return (
    <div className={`flex ${incoming ? "justify-start" : "justify-end"}`}>
      {incoming && <div className="mr-2 self-end"><Avatar name="Клиент" /></div>}
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[15px] shadow border ${
          incoming ? "bg-white border-slate-200 text-slate-800" : "text-slate-900"
        }`}
        style={!incoming ? { background: WA_GREEN, borderColor: "#cdebb5" } : {}}
      >
        <p className="whitespace-pre-wrap leading-snug">{msg.text}</p>
        <div className="mt-1 flex items-center gap-1 justify-end text-[11px] text-slate-500">
          <span>{msg.time}</span>
          {!incoming && <DoubleTick read />}
        </div>
      </div>
    </div>
  );
}

/** Слайд: «телефон» с мини-диалогом */
function ChatSlide({ name, convo }) {
  return (
    <div className="px-3 sm:px-4">
      <div className="mx-auto max-w-md rounded-[28px] overflow-hidden border border-slate-200 shadow-xl bg-white/80 backdrop-blur">
        {/* Шапка */}
        <div className="px-4 py-3 text-white flex items-center gap-3" style={{ background: WA_HEADER }}>
          <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
            <path fill="#fff" d="M19.11 17.46c-.28-.14-1.64-.8-1.9-.89-.26-.1-.45-.14-.64.14-.19.28-.73.89-.9 1.07-.17.19-.34.21-.62.07-.28-.14-1.2-.44-2.3-1.41-.85-.76-1.42-1.7-1.59-1.99-.17-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.53-.87-2.1-.23-.55-.47-.48-.64-.48h-.55c-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.35 0 1.38 1.01 2.72 1.15 2.91.14.19 1.98 3.02 4.78 4.23.67.29 1.2.46 1.61.59.68.21 1.3.18 1.79.11.55-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.14-.26-.21-.54-.35z"/>
          </svg>
          <div>
            <div className="text-[15px] leading-none font-medium">{name || "AI Memories"}</div>
            <div className="text-xs opacity-90 leading-none">в сети</div>
          </div>
        </div>

        {/* Лента чата */}
        <div className="p-3 sm:p-4"
             style={{ background:
               "radial-gradient(18px 18px at 20% 30%, rgba(99, 190, 255,.12), transparent 60%), radial-gradient(22px 22px at 70% 60%, rgba(99,190,255,.12), transparent 60%)" }}>
          <div className="space-y-3">
            {convo.map((m, i) => <Bubble key={i} msg={m} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Простой слайдер без библиотек */
export default function TestimonialsText() {
  const [index, setIndex] = useState(0);
  const wrapRef = useRef(null);
  const count = slides.length;
  const go = (i) => setIndex(((i % count) + count) % count);

  // свайп
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let startX = 0, dx = 0, dragging = false;

    const down = (e) => { dragging = true; startX = (e.touches?.[0]?.clientX ?? e.clientX); };
    const move = (e) => {
      if (!dragging) return;
      const x = (e.touches?.[0]?.clientX ?? e.clientX);
      dx = x - startX;
      el.style.transform = `translateX(calc(${-index * 100}% + ${dx}px))`;
      e.preventDefault();
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      const threshold = 60;
      if (dx > threshold) go(index - 1);
      else if (dx < -threshold) go(index + 1);
      el.style.transform = `translateX(${-index * 100}%)`;
      dx = 0;
    };

    const container = el.parentElement;
    container.addEventListener("pointerdown", down);
    container.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    container.addEventListener("touchstart", down, { passive:false });
    container.addEventListener("touchmove", move, { passive:false });
    window.addEventListener("touchend", up);

    return () => {
      container.removeEventListener("pointerdown", down);
      container.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      container.removeEventListener("touchstart", down);
      container.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [index, count]);

  return (
    <section id="testimonials" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-slate-900">
        Отзывы
      </h2>
      <p className="text-center text-slate-600 mb-6">
        Небольшие диалоги из WhatsApp: сообщение клиента и наш ответ.
      </p>

      {/* Слайдер */}
      <div className="relative mx-auto max-w-3xl overflow-hidden">
        <div
          ref={wrapRef}
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="min-w-full">
              <ChatSlide {...s} />
            </div>
          ))}
        </div>

        {/* Стрелки */}
        <button
          onClick={() => go(index - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white/90 border border-slate-200 shadow hover:bg-white"
          aria-label="Предыдущий отзыв"
        >
          ‹
        </button>
        <button
          onClick={() => go(index + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white/90 border border-slate-200 shadow hover:bg-white"
          aria-label="Следующий отзыв"
        >
          ›
        </button>

        {/* Точки */}
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Перейти к отзыву ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-sky-500" : "bg-slate-300 hover:bg-slate-400"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
