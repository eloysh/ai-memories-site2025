"use client";
import { useEffect, useRef, useState } from "react";

export default function BeforeAfterHero({
  before = "/works/hero_before.jpg",   // фото "До"
  after  = "/works/hero_after.jpg",    // постер для видео (или картинка "После")
  afterVideo = "/works/hero_after.mp4",// ВИДЕО "После"
  aspectClass = "aspect-[21/9]",       // "aspect-square" для 1:1
}) {
  const boxRef = useRef(null);
  const vidRef = useRef(null);
  const [x, setX] = useState(50);      // позиция разделителя
  const [drag, setDrag] = useState(false);
  const [videoOk, setVideoOk] = useState(true);

  // проценты из координаты
  const pctFrom = (clientX) => {
    const r = boxRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
  };

  // перетаскивание мышью/тачем по всей области
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const down = (e) => { setDrag(true); setX(pctFrom(e.clientX ?? e.touches?.[0]?.clientX)); };
    const move = (e) => {
      if (!drag) return;
      const cx = e.clientX ?? e.touches?.[0]?.clientX;
      setX(pctFrom(cx)); e.preventDefault();
    };
    const up = () => setDrag(false);

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive:false });
    window.addEventListener("pointerup", up);

    el.addEventListener("touchstart", down, { passive:false });
    window.addEventListener("touchmove", move, { passive:false });
    window.addEventListener("touchend", up);

    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("touchstart", down);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [drag]);

  // клавиатура
  const onKey = (e) => {
    if (e.key === "ArrowLeft")  setX((v) => Math.max(0,  v - 2));
    if (e.key === "ArrowRight") setX((v) => Math.min(100, v + 2));
  };

  return (
    <div
      ref={boxRef}
      className={`relative ${aspectClass} rounded-[24px] overflow-hidden border border-slate-200/70 bg-white shadow-2xl`}
      role="slider"
      tabIndex={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(x)}
      onKeyDown={onKey}
    >
      {/* BEFORE — фото */}
      <img src={before} alt="До" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* AFTER — видео (если не загрузилось, постер after) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        {videoOk && afterVideo ? (
          <video
            ref={vidRef}
            className="w-full h-full object-cover"
            src={afterVideo}
            poster={after}         // показываем постер до старта
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoOk(false)}
          />
        ) : (
          <img src={after} alt="После" className="w-full h-full object-cover" draggable={false} />
        )}
      </div>

      {/* линия и ручка */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-sky-500/80"
        style={{ left: `${x}%`, transform: "translateX(-1.5px)" }}
        aria-hidden="true"
      />
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center w-10 h-10 rounded-full bg-sky-500 text-white shadow ring-4 ring-white/70"
        style={{ left: `${x}%` }}
        aria-label="Перетянуть"
        onPointerDown={() => setDrag(true)}
      >
        ⇆
      </button>

      {/* подписи */}
      <div className="absolute top-3 left-3 bg-white/90 rounded px-2 py-1 text-sm text-slate-700">До</div>
      <div className="absolute top-3 right-3 bg-white/90 rounded px-2 py-1 text-sm text-slate-700">После</div>
    </div>
  );
}
