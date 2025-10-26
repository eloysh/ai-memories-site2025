export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://aimemories.ru";
  return [
    { url: `${base}/`, changefreq: "weekly", priority: 1.0 },
    { url: `${base}/animate`, changefreq: "monthly", priority: 0.9 },
    { url: `${base}/song`, changefreq: "monthly", priority: 0.9 },
    { url: `${base}/restoration`, changefreq: "monthly", priority: 0.9 },
    { url: `${base}/enhance`, changefreq: "monthly", priority: 0.9 },
  ];
}
