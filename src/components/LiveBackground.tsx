'use client';

import { useEffect, useRef } from 'react';

/**
 * Living Nocturnal-Steel backdrop.
 *  • CSS layer: steel-blue light pools drifting continuously + a rotating aurora.
 *  • Canvas layer: a slow "star-dust" field of ice particles that flows on its own;
 *    near the cursor particles are pushed aside, brighten, and link with hairlines,
 *    leaving a soft comet trail as the pointer sweeps across the page.
 *  • A large glow follows the pointer.
 * Pauses when the tab is hidden; static for prefers-reduced-motion.
 */
export function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas || !glow) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let ps: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(140, (w * h) / (fine ? 11000 : 16000)));
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.08,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.5 + 0.25,
      }));
    };
    resize();

    // pointer state (eased)
    const m = { x: w * 0.7, y: h * 0.3, tx: w * 0.7, ty: h * 0.3, active: false, speed: 0 };
    const trail: { x: number; y: number; life: number }[] = [];

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - m.tx;
      const dy = e.clientY - m.ty;
      m.speed = Math.min(60, Math.hypot(dx, dy));
      m.tx = e.clientX;
      m.ty = e.clientY;
      m.active = true;
      trail.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.length > 28) trail.shift();
    };
    const onLeave = () => (m.active = false);

    let t = 0;
    let raf = 0;
    const RADIUS = 170;

    const frame = () => {
      t += 0.004;
      m.x += (m.tx - m.x) * 0.12;
      m.y += (m.ty - m.y) * 0.12;
      m.speed *= 0.92;
      glow.style.transform = `translate3d(${m.x - 450}px, ${m.y - 450}px, 0)`;
      glow.style.opacity = m.active ? String(0.75 + Math.min(0.25, m.speed / 120)) : '0.35';

      ctx.clearRect(0, 0, w, h);

      // comet trail
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.life *= 0.9;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 40 * p.life + 4);
        g.addColorStop(0, `rgba(226,237,245,${0.10 * p.life})`);
        g.addColorStop(1, 'rgba(155,182,206,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 40 * p.life + 4, 0, Math.PI * 2);
        ctx.fill();
      }
      while (trail.length && trail[0].life < 0.03) trail.shift();

      // particles: continuous drift with a gentle flow field + pointer repulsion
      const near: P[] = [];
      for (const p of ps) {
        const flow = Math.sin(p.y * 0.004 + t * 3) * 0.06 + Math.cos(p.x * 0.003 - t * 2) * 0.06;
        p.vx += flow * 0.02;
        p.vy += Math.sin(p.x * 0.004 + t * 2.4) * 0.002;

        const dx = p.x - m.x;
        const dy = p.y - m.y;
        const d = Math.hypot(dx, dy);
        let boost = 0;
        if (m.active && d < RADIUS) {
          const f = (1 - d / RADIUS) * (0.6 + m.speed / 40);
          p.vx += (dx / (d || 1)) * f * 0.35;
          p.vy += (dy / (d || 1)) * f * 0.35;
          boost = 1 - d / RADIUS;
          near.push(p);
        }
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx + 0.05;
        p.y += p.vy - 0.12;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const twinkle = 0.75 + Math.sin(t * 20 + p.x) * 0.25;
        ctx.fillStyle = `rgba(${boost ? '226,237,245' : '184,206,224'},${Math.min(1, p.a * twinkle + boost * 0.8)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + boost * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // hairline constellation around the pointer
      ctx.lineWidth = 0.6;
      for (let i = 0; i < near.length; i++) {
        const a = near[i];
        const da = Math.hypot(a.x - m.x, a.y - m.y);
        ctx.strokeStyle = `rgba(184,206,224,${0.35 * (1 - da / RADIUS)})`;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(a.x, a.y);
        ctx.stroke();
        for (let j = i + 1; j < near.length; j++) {
          const b = near[j];
          const dd = Math.hypot(a.x - b.x, a.y - b.y);
          if (dd < 90) {
            ctx.strokeStyle = `rgba(155,182,206,${0.28 * (1 - dd / 90)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        ctx.fillStyle = `rgba(184,206,224,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      resize();
      if (reduce) drawStatic();
    };

    if (reduce) drawStatic();
    else raf = requestAnimationFrame(frame);

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="live-bg">
      <div className="live-bg__pool live-bg__pool--a" />
      <div className="live-bg__pool live-bg__pool--b" />
      <div className="live-bg__pool live-bg__pool--c" />
      <div className="live-bg__pool live-bg__pool--d" />
      <div className="live-bg__aurora" />
      <div ref={glowRef} className="live-bg__glow" />
      <canvas ref={canvasRef} className="live-bg__canvas" />
      <div className="live-bg__vignette" />
    </div>
  );
}
