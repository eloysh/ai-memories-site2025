export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aimemories.ru"),
  title: {
    default: "AI Memories — оживлю ваши фото в трогательное видео",
    template: "%s · AI Memories",
  },
  description:
    "Оживление старых фото, реставрация, эмоции и монтаж. Бесплатный тест — «Оживить фото». WhatsApp +7 984 193-37-92.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "AI Memories — оживлю ваши фото в трогательное видео",
    description: "Реставрация, цвет, эмоции, видео-истории. Память оживает.",
    siteName: "AI Memories",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Memories",
    description: "Оживление фото и видеоролики для семьи и юбилеев.",
    images: ["/opengraph-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
