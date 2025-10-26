// lib/whatsapp.js
const RAW_PHONE = "+7 984 193-37-92"; // твой номер
export const WHATSAPP_PHONE = RAW_PHONE.replace(/\D/g, "").replace(/^8/, "7");

export const whatsappURL = (message = "") => {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
