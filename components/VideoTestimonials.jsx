"use client";
import React, { useState } from "react";

/** Одна карточка вертикального видео 9:16 */
function VideoCard({ title, src, poster, quote, name }) {
  const [error, setError] = useState(false);

  return (
    <figure className="rounded-3xl overflow-hidden border border-slate-200 bg-white/80 backdrop-blur shadow flex flex-col">
      {/* Контейнер 9:16 — портретный */}
      <div className="relative mx-auto w-full max-w-sm md:max-w-md aspect-[9/16]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setError(true)}
        >
          {src && <source src={src} type="video/mp4" />}
          {/* Фолбэк, если файла нет */}
          <source src="/demo_after_video.mp4" type="video/mp4" />
        </video>

        {/* водяной знак */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-end p-2">
          <span className="text-white/85 text-[10px] bg-black/35 px-1.5 py-0.5 rounded">
            AI Memories
          </span>
        </div>

        {/* Сообщение об ошибке пути */}
        {error && (
          <div className="absolute inset-0 grid place-items-center bg-black/30">
            <div className="rounded-xl bg-white/95 px-3 py-2 text-sm text-slate-800 shadow">
              Файл не найден: <code className="text-slate-600">{src}</code>
            </div>
          </div>
        )}
      </div>

      <figcaption className="px-4 py-3">
        <div className="font-medium text-slate-900 text-center">{title}</div>
        {quote && (
          <div className="mt-2 flex gap-2 text-slate-700 justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-cyan-300 text-white grid place-items-center text-sm font-medium">
              {(name || "К")[0].toUpperCase()}
            </div>
            <p className="text-sm italic max-w-xs">“{quote}”</p>
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export default function VideoTestimonials() {
  // Файлы: /public/works/videos/ (портрет 1080×1920)
  const review = {
    title: "Пример работы",
    src: "/works/videos/review_01.mp4",
    poster: "/works/videos/review_01_poster.jpg",
  };

  const sample = {
    title: "Видео-отзыв · песня на заказ",
    src: "/works/videos/full_01.mp4",
    poster: "/works/videos/full_01_poster.jpg",
    name: "Светлана",
    quote:
      "Получилось очень трогательно! Мама расплакалась, когда увидела, как фото оживают. И папа очень растрогался, когда услышал их песню по их истории.",
  };

  return (
    // ВАЖНО: скрыто на мобилке, видно только на >= md
    <section id="video-testimonials" className="reveal hidden md:block">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-slate-900">
        Видео-отзыв и пример работы
      </h2>
      <p className="text-center text-slate-600 mb-6">
        Вертикальный формат 9:16 — идеально для сторис и телефонов.
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
        <VideoCard {...review} />
        <VideoCard {...sample} />
      </div>
    </section>
  );
}
