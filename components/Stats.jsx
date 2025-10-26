"use client";
import { useEffect, useRef, useState } from "react";
export default function Stats(){
  const [numbers,setNumbers]=useState({photos:1200, videos:350, ontime:98});
  const rootRef = useRef(null);

  useEffect(()=>{
    // counters animation
    let ran=false;
    const el=rootRef.current;
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting && !ran){
          ran=true;
          const start=Date.now();
          const dur=1200;
          const from={photos:0,videos:0,ontime:0};
          const step=()=>{
            const k=Math.min(1,(Date.now()-start)/dur);
            setNumbers({
              photos: Math.round(from.photos + (1200-from.photos)*k),
              videos: Math.round(from.videos + (350-from.videos)*k),
              ontime: Math.round(from.ontime + (98-from.ontime)*k),
            });
            if(k<1) requestAnimationFrame(step);
          };
          step();
        }
      });
    },{threshold:.4});
    if(el) obs.observe(el);
    return ()=>obs.disconnect();
  },[]);

  const Item = ({n,label})=>(
    <div className="card text-center">
      <div className="text-4xl font-bold">{n}</div>
      <div className="text-white/70 mt-1">{label}</div>
    </div>
  );

  return (
    <section id="stats" className="reveal" ref={rootRef}>
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">Сколько уже сделано</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <Item n={`${numbers.photos}+`} label="оживлённых фото" />
        <Item n={`${numbers.videos}+`} label="смонтированных роликов" />
        <Item n={`${numbers.ontime}%`} label="заказов в срок" />
      </div>
    </section>
  );
}
