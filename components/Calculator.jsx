"use client";
import { useMemo, useState } from "react";
import { whatsappURL } from "../lib/whatsapp"; // генератор ссылки wa.me

// формат ₽
const rub = (n) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(Number(n) || 0)) + " ₽";

// цены
const PRICES = {
  miniVideo: 4500,       // до 10 фото
  fullVideoFrom: 8000,   // от 10 фото (нижняя граница "от ...")
  perPhotoNoSong: 225,   // поштучно без песни на заказ
  perPhotoWithSong: 180, // поштучно с песней на заказ
  oneTwoPhotos: 1350,    // 1–2 фото фикс
  exclusiveSong: 3500,   // песня под заказ (эксклюзив)
  addText: 100,          // имена/даты
  musicPick: 150,        // индивидуальный подбор музыки
  rush: 1000,            // срочно 24 часа
};

// маленький переключатель-ряд
function Toggle({ label, note, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:bg-white transition">
      <div className="text-sm">
        <div className="text-slate-800">{label}</div>
        {note ? (
          <div className="text-slate-500 text-xs mt-0.5">{note}</div>
        ) : null}
      </div>
      <input
        type="checkbox"
        className="h-5 w-5 rounded border-slate-300"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export default function Calculator() {
  const [mode, setMode] = useState("video"); // "video" | "photos"
  const [videoType, setVideoType] = useState("mini"); // "mini" | "full"
  const [photos, setPhotos] = useState(10);
  const [withSongOrder, setWithSongOrder] = useState(false); // только для "photos"
  const [exclusiveSong, setExclusiveSong] = useState(false);
  const [addText, setAddText] = useState(false);
  const [musicPick, setMusicPick] = useState(false);
  const [rush, setRush] = useState(false);

  // расчёт итогов
  const result = useMemo(() => {
    let base = 0;
    let baseLabel = "";
    let prefix = ""; // "от " для полноценного видео

    if (mode === "photos") {
      if (photos <= 2) {
        base = PRICES.oneTwoPhotos;
        baseLabel = "1–2 фото (фикс)";
      } else {
        const rate = withSongOrder
          ? PRICES.perPhotoWithSong
          : PRICES.perPhotoNoSong;
        base = rate * photos;
        baseLabel = `Оживление ${photos} фото × ${rub(rate)}`;
      }
    } else {
      if (videoType === "mini") {
        base = PRICES.miniVideo;
        baseLabel = "Мини-ролик (до 10 фото)";
      } else {
        base = PRICES.fullVideoFrom;
        baseLabel = "Полноценный видеоролик (от 10 фото)";
        prefix = "от ";
      }
    }

    const extras = [];
    if (exclusiveSong)
      extras.push({
        label: "Песня под заказ (эксклюзив)",
        price: PRICES.exclusiveSong,
      });
    if (addText)
      extras.push({
        label: "Добавление текста (имена/даты)",
        price: PRICES.addText,
      });
    if (musicPick)
      extras.push({
        label: "Индивидуальный подбор музыки",
        price: PRICES.musicPick,
      });
    if (rush)
      extras.push({
        label: "Срочно (24 часа)",
        price: PRICES.rush,
      });

    const addons = extras.reduce((s, e) => s + e.price, 0);
    const total = base + addons;

    return { base, baseLabel, extras, addons, total, prefix };
  }, [
    mode,
    videoType,
    photos,
    withSongOrder,
    exclusiveSong,
    addText,
    musicPick,
    rush,
  ]);

  // собираем текст заявки для WhatsApp
  const buildSummary = () => {
    const extrasTxt = result.extras.length
      ? result.extras
          .map((e) => `• ${e.label} (+${rub(e.price)})`)
          .join("\n")
      : "без доп. опций";

    return [
      "Здравствуйте! Хочу оформить заказ в AI Memories.",
      "",
      `Режим: ${mode === "video" ? "Видео-история" : "Оживление фото"}`,
      mode === "video"
        ? `Тип ролика: ${
            videoType === "mini" ? "Мини (до 10 фото)" : "Полноценный (от 10 фото)"
          }`
        : `Тариф по фото: ${photos} шт${
            withSongOrder ? " (с песней на заказ)" : ""
          }`,
      `Фото: ${photos}`,
      "Опции:",
      extrasTxt,
      "",
      `Итого: ${result.prefix}${rub(result.total)}`,
    ].join("\n");
  };

  const handleOrder = () => {
    const url = whatsappURL(buildSummary());
    window.open(url, "_blank", "noopener");
  };

  return (
    <section id="calculator" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-slate-900">
        Калькулятор
      </h2>
      <p className="text-center text-slate-600 mb-6">
        Прикиньте бюджет и сразу отправьте заявку в WhatsApp.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка — настройки */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white/70 backdrop-blur p-6 md:p-8 shadow-lg">
          {/* Переключение режима */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setMode("video")}
              className={`px-4 py-2 rounded-xl border transition ${
                mode === "video"
                  ? "bg-white border-slate-300 shadow-sm"
                  : "border-slate-200 hover:bg-white"
              }`}
            >
              Видео-история
            </button>
            <button
              onClick={() => setMode("photos")}
              className={`px-4 py-2 rounded-xl border transition ${
                mode === "photos"
                  ? "bg-white border-slate-300 shadow-sm"
                  : "border-slate-200 hover:bg-white"
              }`}
            >
              Оживление фото
            </button>
          </div>

          {mode === "video" ? (
            <div className="space-y-6">
              {/* Тип ролика */}
              <div>
                <label className="block text-sm text-slate-600 mb-2">
                  Тип ролика
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setVideoType("mini")}
                    className={`px-4 py-2 rounded-xl border transition ${
                      videoType === "mini"
                        ? "bg-white border-slate-300 shadow-sm"
                        : "border-slate-200 hover:bg-white"
                    }`}
                  >
                    Мини (до 10 фото)
                  </button>
                  <button
                    onClick={() => setVideoType("full")}
                    className={`px-4 py-2 rounded-xl border transition ${
                      videoType === "full"
                        ? "bg-white border-slate-300 shadow-sm"
                        : "border-slate-200 hover:bg-white"
                    }`}
                  >
                    Полноценный (от 10 фото)
                  </button>
                </div>
              </div>

              {/* Количество фото */}
              <div>
                <label className="block text-sm text-slate-600 mb-2">
                  Количество фотографий
                </label>
                <input
                  type="range"
                  min={1}
                  max={60}
                  value={photos}
                  onChange={(e) =>
                    setPhotos(parseInt(e.target.value, 10) || 1)
                  }
                  className="w-full"
                />
                <div className="mt-2 text-slate-800">{photos} фото</div>
                {videoType === "mini" && photos > 10 && (
                  <p className="mt-2 text-xs text-amber-600/90">
                    Для {photos} фото выгоднее выбрать «Полноценный» пакет.
                  </p>
                )}
              </div>

              {/* Допы */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Toggle
                  label="Песня под заказ (эксклюзив)"
                  checked={exclusiveSong}
                  onChange={setExclusiveSong}
                  note={`+ ${rub(PRICES.exclusiveSong)}`}
                />
                <Toggle
                  label="Добавление текста (имена/даты)"
                  checked={addText}
                  onChange={setAddText}
                  note={`+ ${rub(PRICES.addText)}`}
                />
                <Toggle
                  label="Индивидуальный подбор музыки"
                  checked={musicPick}
                  onChange={setMusicPick}
                  note={`+ ${rub(PRICES.musicPick)}`}
                />
                <Toggle
                  label="Срочно (24 часа)"
                  checked={rush}
                  onChange={setRush}
                  note={`+ ${rub(PRICES.rush)}`}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Количество фото */}
              <div>
                <label className="block text-sm text-slate-600 mb-2">
                  Количество фотографий
                </label>
                <input
                  type="range"
                  min={1}
                  max={60}
                  value={photos}
                  onChange={(e) =>
                    setPhotos(parseInt(e.target.value, 10) || 1)
                  }
                  className="w-full"
                />
                <div className="mt-2 text-slate-800">{photos} фото</div>
                {photos <= 2 && (
                  <p className="mt-2 text-xs text-slate-500">
                    На 1–2 фото действует фиксированная цена{" "}
                    {rub(PRICES.oneTwoPhotos)}.
                  </p>
                )}
              </div>

              {/* Тариф по фото с песней или без */}
              <div className="flex items-center gap-3">
                <input
                  id="withSong"
                  type="checkbox"
                  className="h-5 w-5 rounded border-slate-300"
                  checked={withSongOrder}
                  onChange={(e) => setWithSongOrder(e.target.checked)}
                />
                <label htmlFor="withSong" className="text-slate-800">
                  С песней на заказ (тариф {rub(PRICES.perPhotoWithSong)} / фото)
                </label>
              </div>

              {/* Допы */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Toggle
                  label="Песня под заказ (эксклюзив)"
                  checked={exclusiveSong}
                  onChange={setExclusiveSong}
                  note={`+ ${rub(PRICES.exclusiveSong)}`}
                />
                <Toggle
                  label="Добавление текста (имена/даты)"
                  checked={addText}
                  onChange={setAddText}
                  note={`+ ${rub(PRICES.addText)}`}
                />
                <Toggle
                  label="Индивидуальный подбор музыки"
                  checked={musicPick}
                  onChange={setMusicPick}
                  note={`+ ${rub(PRICES.musicPick)}`}
                />
                <Toggle
                  label="Срочно (24 часа)"
                  checked={rush}
                  onChange={setRush}
                  note={`+ ${rub(PRICES.rush)}`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Правая колонка — итог */}
        <aside className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-6 md:p-8 shadow-lg">
          <h4 className="text-xl font-semibold text-slate-900">Итого</h4>

          <div className="mt-3 text-sm text-slate-600">
            <div className="flex justify-between gap-3">
              <span>{result.baseLabel}</span>
              <span className="font-medium text-slate-800">
                {rub(result.base)}
              </span>
            </div>

            {result.extras.length > 0 && (
              <>
                <div className="my-2 h-px bg-slate-200" />
                {result.extras.map((e, i) => (
                  <div key={i} className="flex justify-between gap-3">
                    <span>{e.label}</span>
                    <span className="text-slate-800">+ {rub(e.price)}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="mt-5 text-4xl font-bold text-slate-900">
            {result.prefix}
            {rub(result.total)}
          </div>

          {mode === "video" && videoType === "full" && (
            <p className="mt-2 text-xs text-slate-500">
              Точная цена зависит от объёма/длительности и пожеланий.
              Показана минимальная оценка «от ...».
            </p>
          )}

          <button
            onClick={handleOrder}
            className="mt-6 w-full inline-flex items-center justify-center rounded-2xl border border-sky-300/60 bg-sky-500/10 hover:bg-sky-500/20 px-5 py-3 font-medium transition"
          >
            Заказать в WhatsApp
          </button>

          <p className="text-xs text-slate-500 mt-3">
            Укажите: сколько фото, желаемую длительность, нужна ли озвучка/текст,
            эксклюзивная песня и срок.
          </p>
        </aside>
      </div>
    </section>
  );
}
