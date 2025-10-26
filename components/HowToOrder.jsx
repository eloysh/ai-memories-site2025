export default function HowToOrder(){
  const steps = [
    "Присылаете фото и пожелания (WhatsApp/Telegram)",
    "Я делаю пробное оживление бесплатно",
    "Обсуждаем правки, выбираем музыку",
    "Делаю итоговый ролик и отправляю в нужном формате"
  ];
  return (
    <section id="howto" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Как оформить заказ</h2>
      <ol className="grid md:grid-cols-4 gap-4 counter-reset list-decimal [&>li]:card">
        {steps.map((s,i)=>(<li key={i} className="card">{s}</li>))}
      </ol>
    </section>
  );
}
