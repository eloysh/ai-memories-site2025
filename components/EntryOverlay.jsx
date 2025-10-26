"use client";
import React, { useRef, useState, useEffect } from "react";
import BrandLogo from "./BrandLogo";

export default function EntryOverlay({
  onEnter,
  audioSrc = "/sounds/enter.mp3",
}) {
  const playedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Предзагружаем аудио файл
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.load();
    }
    // Активируем кнопку после короткой задержки
    const timer = setTimeout(() => setIsReady(true), 800);
    return () => clearTimeout(timer);
  }, [audioSrc]);

  const handleEnter = async () => {
    if (audioSrc && !playedRef.current && audioRef.current) {
      try {
        await audioRef.current.play();
        playedRef.current = true;
      } catch {
        // если не получилось — продолжаем вход
      }
    }
    onEnter?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_#0b1220_30%,_#050914_70%)] text-white">
      {/* лёгкие звёзды/точки, чтобы фон жил */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/bg-stars.svg')] opacity-30 mix-blend-screen" />

      <div className="max-w-2xl w-full px-6 text-center space-y-6">
        <BrandLogo size={120} withWordmark />

        {/* Заголовок — максимально читаемый */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,.9)]">
          Память, которая оживает
        </h1>

        {/* Подзаголовок — короче и ярче */}
        <p className="text-slate-200/90 text-base md:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,.85)]">
          Превращаю ваши фотографии в трогательные видео-истории.
          Нажмите «Вход», услышите короткий аккорд — и начнётся магия ✨
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleEnter}
            disabled={!isReady}
            className={`px-7 py-3 rounded-2xl font-semibold text-slate-900 transition ${
              isReady 
                ? "bg-gradient-to-r from-sky-300 to-sky-500 hover:from-sky-200 hover:to-sky-400 shadow-[0_10px_30px_rgba(56,189,248,.35)]"
                : "bg-gradient-to-r from-slate-300 to-slate-400 cursor-not-allowed opacity-75"
            }`}
          >
            {isReady ? "Вход" : "Загрузка..."}
          </button>

          {/* запасная тихая ссылка без звука, если вдруг нужно */}
          {/* <button onClick={()=>onEnter?.()} className="px-7 py-3 rounded-2xl border border-white/20 text-white/90 hover:bg-white/5">
            Без звука
          </button> */}
        </div>
      </div>
    </div>
  );
}
