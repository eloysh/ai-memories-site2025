"use client";
export default function SEOJsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
