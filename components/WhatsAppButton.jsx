"use client";
import { whatsappURL } from "../lib/whatsapp";

export default function WhatsAppButton({ text = "Написать в WhatsApp", message }) {
  const href = whatsappURL(
    message || "Здравствуйте! Хочу оживить фото/видео. Отправьте, пожалуйста, детали 🙏"
  );
  return (
    <a
      className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-emerald-300/60 bg-emerald-500/10 hover:bg-emerald-500/20 transition"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      💬 {text}
    </a>
  );
}
