import { useRef, useEffect } from "react";

export default function FutureTwinOrb({ size = 340 }) {
  const canvasRef = useRef(null);
  const t = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    let raf;
    const draw = () => {
      t.current += 0.012;
      ctx.clearRect(0, 0, size, size);

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2 - 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,212,255,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Orbit path
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,212,255,0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Present self (warm amber)
      const px = cx + Math.cos(t.current) * 90;
      const py = cy + Math.sin(t.current) * 90;
      const presGrad = ctx.createRadialGradient(px, py, 0, px, py, 26);
      presGrad.addColorStop(0, "#FFD580");
      presGrad.addColorStop(0.5, "#FF9A3C");
      presGrad.addColorStop(1, "rgba(255,107,107,0)");
      ctx.beginPath();
      ctx.arc(px, py, 26, 0, Math.PI * 2);
      ctx.fillStyle = presGrad;
      ctx.fill();
      ctx.shadowColor = "#FF9A3C";
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#FFD580";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Future self (bioluminescent lime)
      const fx = cx + Math.cos(t.current + Math.PI) * 90;
      const fy = cy + Math.sin(t.current + Math.PI) * 90;
      const futGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, 30);
      futGrad.addColorStop(0, "#A8FF78");
      futGrad.addColorStop(0.5, "#56EF8B");
      futGrad.addColorStop(1, "rgba(168,255,120,0)");
      ctx.beginPath();
      ctx.arc(fx, fy, 30, 0, Math.PI * 2);
      ctx.fillStyle = futGrad;
      ctx.fill();
      ctx.shadowColor = "#A8FF78";
      ctx.shadowBlur = 32;
      ctx.beginPath();
      ctx.arc(fx, fy, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#A8FF78";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Central core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 44);
      coreGrad.addColorStop(0, "rgba(0,212,255,0.9)");
      coreGrad.addColorStop(0.4, "rgba(0,212,255,0.3)");
      coreGrad.addColorStop(1, "rgba(0,212,255,0)");
      ctx.shadowColor = "#00D4FF";
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(cx, cy, 44, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = "#00D4FF";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Particle trail between present and future
      for (let i = 0; i < 8; i++) {
        const lerpT = i / 8;
        const trailX = px + (fx - px) * lerpT;
        const trailY = py + (fy - py) * lerpT;
        const alpha =
          Math.sin(lerpT * Math.PI) *
          (0.4 + Math.sin(t.current * 3 + i) * 0.2);
        ctx.beginPath();
        ctx.arc(
          trailX + Math.sin(t.current * 2 + i) * 4,
          trailY + Math.cos(t.current * 2 + i) * 4,
          2.5,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(168,255,120,${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(raf);
  }, [size]);

  return <canvas ref={canvasRef} style={{ width: size, height: size }} />;
}
