import { useRef, useEffect } from "react";

export default function SkillDNARing({ skills }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = 280;
    canvas.width = s;
    canvas.height = s;
    const cx = s / 2;
    const cy = s / 2;
    const r = 100;
    const colors = ["#00D4FF", "#A8FF78", "#FF6B6B", "#FFD580", "#C4B5FD", "#56EF8B"];

    ctx.clearRect(0, 0, s, s);

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 2;
    ctx.stroke();

    const total = skills.reduce((a, b) => a + b.value, 0);
    let startAngle = -Math.PI / 2;

    skills.forEach((skill, i) => {
      const sweep = (skill.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + sweep);
      ctx.strokeStyle = colors[i % colors.length];
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.shadowColor = colors[i % colors.length];
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Labels
      const midAngle = startAngle + sweep / 2;
      const lx = cx + Math.cos(midAngle) * (r + 28);
      const ly = cy + Math.sin(midAngle) * (r + 28);
      ctx.font = "600 10px Inter";
      ctx.fillStyle = colors[i % colors.length];
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(skill.name, lx, ly);
      startAngle += sweep;
    });

    // Center
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,212,255,0.08)";
    ctx.fill();
    ctx.font = "700 11px Space Mono";
    ctx.fillStyle = "#00D4FF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SKILL DNA", cx, cy);
  }, [skills]);

  return <canvas ref={canvasRef} style={{ width: 280, height: 280 }} />;
}
