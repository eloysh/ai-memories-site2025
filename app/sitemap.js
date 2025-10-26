export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://aimemories.ru";
  return [
    { url: `${base}/`, changefreq: "weekly", priority: 1.0 },
  ];
}
