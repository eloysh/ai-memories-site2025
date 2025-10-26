export default function Scenes(){
  const scenes = [
    "Детство и школьные годы",
    "Свадьба и история любви",
    "Память о близких",
    "Путешествия и открытия",
    "Спорт, хобби, достижения",
    "Юбилейные моменты"
  ];
  return (
    <section id="scenes" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Сцены, к которым хочется возвращаться</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {scenes.map((s,i)=>(<div key={i} className="card">{s}</div>))}
      </div>
    </section>
  );
}
