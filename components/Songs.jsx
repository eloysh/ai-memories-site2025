"use client";

const tracks = [
  { title: "С днем рождения, Вика!", src: "/songs/song1.mp3" },
  { title: "Ромашковая любовь",        src: "/songs/song2.mp3" },
  { title: "Креповая свадьба",       src: "/songs/song3.mp3" },
];

export default function Songs() {
  return (
    <section id="songs" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">
        Песня на заказ и примеры
      </h2>
      <p className="text-center text-slate-600 mb-6">
        Есть готовые песни — выберите понравившуюся или закажите эксклюзив.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tracks.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
          >
            <div className="font-medium mb-2">{t.title}</div>
            <audio controls preload="metadata" className="w-full">
              <source src={t.src} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    </section>
  );
}
