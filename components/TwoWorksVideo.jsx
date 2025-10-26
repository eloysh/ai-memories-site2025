"use client";
import React from "react";

function VideoCard({ src, poster, title, badge = "AI Memories" }) {
  return (
    <figure className="rounded-3xl overflow-hidden border border-white/10 bg-black/30">
      <div className="relative aspect-[9/16]">
        <video
          src={src}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          controls
          playsInline
        />
        <div className="absolute top-3 left-3 text-xs bg-white/10 backdrop-blur px-2 py-1 rounded">
          {badge}
        </div>
      </div>
      {title ? (
        <figcaption className="text-center text-slate-700 text-sm py-2 bg-white/70">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function TwoWorksVideo() {
  return (
    <section id="video" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">
        Видео-отзыв и пример работы
      </h2>

      {/* ВНИМАНИЕ: на МОБИЛЬНЫХ уже 2 колонки; на ПК — как было (2 колонки тоже) */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 md:grid-cols-2">
        <VideoCard
          src="/works/videos/review_01.mp4"
          poster="/works/videos/review_01_poster.jpg"
          title="Пример работы"
        />
        <VideoCard
          src="/works/videos/full_01.mp4"
          poster="/works/videos/full_01_poster.jpg"
          title="Видео-отзыв"
          
        />
      </div>
    </section>
  );
}
