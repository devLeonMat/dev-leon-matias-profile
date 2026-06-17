import { useEffect, useRef } from "react";

interface LightWavesProps {
  intensity?: number;
  className?: string;
}

/*
 * LightWaves — canvas animated background with drifting glow blobs + sinusoidal wave bands.
 * Adapted from brucelabs.tech. Colors: indigo/violet palette.
 */
export function LightWaves({ intensity = 0.6, className = "" }: LightWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const waveLayers = [
      { amp: 0.048, freq: 1.6, speed: 0.28, yBase: 0.68, color: [249, 115, 22] as const, alpha: 0.22 },
      { amp: 0.036, freq: 2.1, speed: 0.18, yBase: 0.78, color: [239, 68, 68] as const, alpha: 0.18 },
      { amp: 0.028, freq: 2.8, speed: 0.12, yBase: 0.88, color: [249, 115, 22] as const, alpha: 0.14 },
    ];

    const blobs = [
      { x: 0.15, y: 0.20, r: 0.45, vx:  0.018, vy:  0.012, color: [249, 115, 22] as const },
      { x: 0.75, y: 0.10, r: 0.38, vx: -0.022, vy:  0.015, color: [239, 68, 68] as const },
      { x: 0.50, y: 0.48, r: 0.34, vx:  0.015, vy: -0.017, color: [251, 146, 60] as const },
      { x: 0.88, y: 0.38, r: 0.28, vx: -0.013, vy: -0.010, color: [239, 68, 68] as const },
    ];

    let lastTime = performance.now();

    function draw(now: number) {
      if (!canvas || !ctx) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const W = canvas.width;
      const H = canvas.height;
      const t = now / 1000;

      ctx.clearRect(0, 0, W, H);

      blobs.forEach((b) => {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x < 0.05 || b.x > 0.95) b.vx *= -1;
        if (b.y < 0.02 || b.y > 0.65) b.vy *= -1;

        const cx = b.x * W;
        const cy = b.y * H;
        const r = b.r * Math.min(W, H);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const [cr, cg, cb] = b.color;
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${0.55 * intensity})`);
        g.addColorStop(0.5, `rgba(${cr},${cg},${cb},${0.22 * intensity})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      waveLayers.forEach((layer) => {
        const yBase = layer.yBase * H;
        const amp = layer.amp * H;
        const phase = t * layer.speed;
        const [wr, wg, wb] = layer.color;

        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 3) {
          const y = yBase + amp * Math.sin((x / W) * layer.freq * Math.PI * 2 + phase);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        const wGrad = ctx.createLinearGradient(0, yBase - amp * 2, 0, H);
        wGrad.addColorStop(0, `rgba(${wr},${wg},${wb},${layer.alpha * intensity})`);
        wGrad.addColorStop(1, `rgba(${wr},${wg},${wb},0)`);
        ctx.fillStyle = wGrad;
        ctx.fill();

        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y = yBase + amp * Math.sin((x / W) * layer.freq * Math.PI * 2 + phase);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${wr},${wg},${wb},${0.5 * intensity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
