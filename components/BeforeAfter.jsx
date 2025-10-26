"use client";
import { useRef, useEffect } from "react";

/**
 * beforeSrc — путь к картинке "До"
 * afterSrc  — путь к картинке "После" (если не видео)
 * afterVideoSrc — путь к MP4 "После" (если видео)
 * afterPoster   — постер для видео
 * title, caption — заголовок/подзаголовок
 */
export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  afterVideoSrc,   // <-- если задано, "после" будет видео
  afterPoster,
  title,
  caption,
}) {
  const wrap = useRef(null);
  const handle = useRef(null);
  const afterMedia = useRef(null); // это будет <img> или <video>

  useEffect(() => {
    const el = wrap.current,
      h = handle.current,
      m = afterMedia.current;
    if (!el || !h || !m) return;

    let drag = false;

    const setPct = (pct) => {
      pct = Math.max(0, Math.min(100, pct));
      // клипим «после» (и рамку на нём)
      m.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      // бегунок
      h.style.left = `${pct}%`;
    };

    const start = () => (drag = true);
    const stop = () => (drag = false);

    const move = (e) => {
      if (!drag) return;
      const r = el.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      setPct((x / r.width) * 100);
    };

    el.addEventListener("mousedown", start);
    window.addEventListener("mouseup", stop);
    window.addEventListener("mousemove", move);

    el.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", stop);
    window.addEventListener("touchmove", move, { passive: true });

    setPct(50); // старт по центру

    // автостоп видео за пределами экрана (экономия батареи)
    let io;
    if (m.tagName === "VIDEO") {
      m.muted = true;
      m.playsInline = true;
      m.loop = true;
      m.autoplay = true;
      m.play().catch(() => {});
      io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) m.play().catch(() => {});
            else m.pause();
          });
        },
        { threshold: 0.2 }
      );
      io.observe(el);
    }

    return () => {
      el.removeEventListener("mousedown", start);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("mousemove", move);
      el.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", stop);
      window.removeEventListener("touchmove", move);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <figure className="bg-white/80 p-4 rounded-2xl shadow card reveal">
      <figcaption className="text-left mb-3">
        {title && (
          <div className="text-lg font-semibold text-blue-700">{title}</div>
        )}
        {caption && <div className="text-sm text-gray-600">{caption}</div>}
      </figcaption>

      {/* КВАДРАТНЫЙ слайдер */}
      <div ref={wrap} className="beforeafter select-none cursor-col-resize">
        {/* ДО (картинка) */}
        <img src={beforeSrc} alt="До" className="framed" />

        {/* ПОСЛЕ — либо IMG, либо VIDEO. Оба получают .framed и clipPath */}
        {afterVideoSrc ? (
          <video
            ref={afterMedia}
            className="framed"
            poster={afterPoster}
            playsInline
            muted
            loop
            autoPlay
          >
            <source src={afterVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            ref={afterMedia}
            src={afterSrc}
            alt="После"
            className="framed"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        )}

        {/* разделитель + ручка */}
        <div
          ref={handle}
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 backdrop-blur-sm border-l border-r border-blue-300 shadow"
          style={{ left: "50%" }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-blue-500 text-white text-xs shadow"
          aria-hidden
        >
          ⇆
        </div>
      </div>
    </figure>
  );
}
