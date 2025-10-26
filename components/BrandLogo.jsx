"use client";
import React from "react";

/** Красивый неоновый логотип: сердечко + “AI” + подпись Memories */
export default function BrandLogo({
  size = 140,          // размер иконки (в пикселях)
  withWordmark = true, // выводить слово “Memories”
  className = "",
}) {
  return (
    <div className={`inline-flex items-center gap-4 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        aria-label="AI Memories"
        role="img"
      >
        <defs>
          <linearGradient id="aiG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ee7ff" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Контур сердечка с мягким свечением */}
        <path
          d="M32 54c-.8-.7-2.6-2.2-4.5-3.9C19 45 9 37.2 9 26.7 9 20.7 14 16 19.9 16c3.8 0 6.8 1.9 8.6 5 1.8-3.1 4.8-5 8.6-5C42.9 16 48 20.7 48 26.7c0 10.5-10 18.3-18.5 23.4C34.6 51.8 32.8 53.3 32 54z"
          fill="none"
          stroke="url(#aiG)"
          strokeWidth="0.5"
          filter="url(#softGlow)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Надпись AI */}
        <text
          x="32"
          y="31"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="url(#aiG)"
          style={{ filter: "url(#softGlow)" }}
        >
          AI
        </text>
      </svg>

      {withWordmark && (
        <span className="text-3xl md:text-4xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-sky-500 drop-shadow-[0_1px_6px_rgba(59,130,246,.35)]">
          Memories
        </span>
      )}
    </div>
  );
}
