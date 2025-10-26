export default function WatermarkedPlayer(){
  return (
    <section id="video" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Видео‑отзыв и пример работы</h2>
      <div className="relative max-w-3xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/30">
        <div className="absolute inset-0 grid place-items-center text-white/60">Здесь будет ваш видеоролик (mp4)</div>
        <div className="absolute top-3 left-3 text-xs bg-white/10 backdrop-blur px-2 py-1 rounded">AI Memories</div>
      </div>
    </section>
  );
}
