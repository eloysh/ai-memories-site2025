export const dynamic = 'force-static';
export const metadata = {
  title: "Оживить фото — тест",
  description: "Загрузите фото и получите бесплатный тест-ролик.",
};

export default function AnimatePage() {
  return (
    <section className="container py-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-4">Оживить фото</h1>
      <p className="text-slate-600">
        Страница в разработке. Напишите мне в WhatsApp — пришлю бесплатный тест.
      </p>
      <a href="/" className="inline-block mt-6 rounded-xl px-4 py-2 bg-sky-500/10 border border-sky-300/50 hover:bg-sky-500/20 transition">
        ← На главную
      </a>
    </section>
  );
}
import SEOJsonLd from "../components/SEOJsonLd";

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AI Memories",
  "url": "https://aimemories.ru",
  "logo": "https://aimemories.ru/opengraph-image.jpg",
  "sameAs": [
    "https://t.me/...",       // добавь, если есть
    "https://vk.com/...",     // соцсети помогут по брендовому запросу
    "https://www.youtube.com/@..." 
  ]
};

const webSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AI Memories",
  "url": "https://aimemories.ru",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://aimemories.ru/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function Page() {
  // ...
  return (
    <div className="relative min-h-screen">
      {/* ... */}
      <SEOJsonLd data={org} />
      <SEOJsonLd data={webSite} />
      {/* ... */}
    </div>
  );
}
