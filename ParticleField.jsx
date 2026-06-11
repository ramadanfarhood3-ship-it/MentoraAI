import { useRef, useEffect } from "react";

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let mouse = { x: w / 2, y: h / 2 };

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      color:
        Math.random() > 0.7
          ? "#00D4FF"
          : Math.random() > 0.5
          ? "#A8FF78"
          : "rgba(255,255,255,0.4)",
      pulse: Math.random() * Math.PI * 2,
    }));

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.pulse += 0.02;
        p.x += p.vx + (mouse.x - w / 2) * 0.00015;
        p.y += p.vy + (mouse.y - h / 2) * 0.00015;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        const alpha = 0.4 + Math.sin(p.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.r * (0.8 + Math.sin(p.pulse) * 0.2),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = p.color.startsWith("#")
          ? p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0")
          : p.color;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
