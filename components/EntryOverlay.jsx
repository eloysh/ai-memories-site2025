"use client";
import { useRef, useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";

// Оверлей с авто-входом через 5 секунд; кнопка остаётся для немедленного входа и воспроизведения звука
export default function EntryOverlay({ onEnter, audioSrc = "/songs/enter.mp3" }) {
  const audioRef = useRef(null);
  const [secondsLeft, setSecondsLeft] = useState(5);

  // Если мобильное устройство — сразу пропускаем пользователя (не показываем оверлей)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
    const isSmall = window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
    if (isTouch || isSmall) {
      // Небольшая отложка, чтобы внешний код успел примонтировать
      setTimeout(() => onEnter?.(), 0);
    }
  }, [onEnter]);

  useEffect(() => {
    // Обратный отсчёт и автоматический вход через 5 секунд
    let mounted = true;
    const interval = setInterval(() => {
      if (!mounted) return;
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    const timer = setTimeout(() => {
      if (mounted) onEnter?.();
    }, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onEnter]);

  const handleEnter = () => {
    // Сразу впускаем пользователя
    onEnter?.();

    // Пытаемся проиграть звук в user-gesture
    try {
      const a = audioRef.current;
      if (a) {
        a.currentTime = 0;
        const p = a.play();
        if (p?.catch) p.catch(() => {});
      }
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_#0b1220_30%,_#050914_70%)] text-white">
      <div className="max-w-2xl w-full px-6 text-center space-y-6">
        <BrandLogo size={120} withWordmark />

        <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,.9)]">
          Память, которая оживает
        </h1>

        <p className="text-slate-200/90 text-base md:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,.85)]">
          Превращаю ваши фотографии в трогательные видео-истории. Вы будете перенаправлены на сайт автоматически через несколько секунд.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleEnter}
            className="px-7 py-3 rounded-2xl font-semibold text-slate-900 bg-gradient-to-r from-sky-300 to-sky-500 hover:from-sky-200 hover:to-sky-400 transition shadow-[0_10px_30px_rgba(56,189,248,.35)]"
          >
            Вход{secondsLeft > 0 ? ` — ${secondsLeft}s` : ""}
          </button>
        </div>
      </div>

      {/* аудио элемент: preload=none, проигрываем по возможности при ручном клике */}
      <audio ref={audioRef} src={audioSrc} preload="none" />
    </div>
  );
}
