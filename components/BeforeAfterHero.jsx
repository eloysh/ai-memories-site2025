"use client";
import { useEffect, useRef, useState } from "react";

export default function BeforeAfterHero({
  before = "/works/hero_before.jpg",
  after  = "/works/hero_after.jpg",     // poster для видео
  afterVideo = "/works/hero_after.mp4", // видео
  aspectClass = "aspect-[21/9]",
}) {
  const boxRef = useRef(null);
  const [x, setX] = useState(50);
  const [drag, setDrag] = useState(false);
  const [videoOk, setVideoOk] = useState(true);

  const pctFrom = (clientX) => {
    const r = boxRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
  };

  // Только Pointer Events
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const down = (e) => { setDrag(true); setX(pctFrom(e.clientX)); };
    const move = (e) => { if (!drag) return; setX(pctFrom(e.clientX)); e.preventDefault(); };
    const up   = () => setDrag(false);

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);

    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag]);

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
      <img src={before} alt="До" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        {videoOk && afterVideo ? (
          <video
            className="w-full h-full object-cover"
            src={afterVideo}
            poster={after}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onError={() => setVideoOk(false)}
          />
        ) : (
          <img src={after} alt="После" className="w-full h-full object-cover" draggable={false} />
        )}
      </div>

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

      <div className="absolute top-3 left-3 bg-white/90 rounded px-2 py-1 text-sm text-slate-700">До</div>
      <div className="absolute top-3 right-3 bg-white/90 rounded px-2 py-1 text-sm text-slate-700">После</div>
    </div>
  );
}
