"use client";
import { useEffect } from "react";

export default function BackgroundFX(){
  useEffect(()=>{
    const canvas = document.createElement("canvas");
    canvas.className = "fixed inset-0 -z-10 w-screen h-screen";
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    const resize = ()=>{ canvas.width = innerWidth; canvas.height = innerHeight; };
    resize(); addEventListener("resize", resize);

    const bubbles = Array.from({length: 60}, (_,i)=>({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*40+10,
      s: Math.random()*0.5+0.2
    }));
    let raf;
    const loop=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(const b of bubbles){
        b.y -= b.s;
        if(b.y + b.r < 0){ b.y = canvas.height + b.r; b.x = Math.random()*canvas.width; }
        const g = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
        g.addColorStop(0,"rgba(56,189,248,0.35)");
        g.addColorStop(1,"rgba(56,189,248,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    }; loop();
    return ()=>{ cancelAnimationFrame(raf); removeEventListener("resize", resize); canvas.remove(); };
  },[]);
  return null;
}
