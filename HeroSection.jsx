import { useState, useEffect } from "react";
import ParticleField from "./ParticleField";
import FutureTwinOrb from "./FutureTwinOrb";

export default function HeroSection() {
  const words = ["Smarter.", "Faster.", "Deeper.", "Together."];
  const [wIdx, setWIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWIdx((i) => (i + 1) % words.length);
        setFade(true);
      }, 300);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #050508 0%, #080D18 55%, #050508 100%)",
      }}
    >
      <ParticleField />

      {/* Radial glow */}
      <div
        className="absolute"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div>
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10"
            style={{
              background: "rgba(0,212,255,0.07)",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "#00D4FF",
                letterSpacing: "0.12em",
              }}
            >
              MENTORA INTELLIGENCE v2.0 · LIVE
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(3rem, 5.5vw, 5rem)",
              lineHeight: 1.05,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Learn{" "}
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #00D4FF, #A8FF78)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                transition: "opacity 0.3s",
                opacity: fade ? 1 : 0,
                minWidth: "4ch",
              }}
            >
              {words[wIdx]}
            </span>
            <br />
            Grow Faster.
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>
              Build your future.
            </em>
          </h1>

          <p
            className="text-lg leading-relaxed mb-10"
            style={{
              color: "rgba(255,255,255,0.45)",
              maxWidth: 520,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            The world's most advanced AI learning ecosystem. Personalized to
            your mind, aligned to your goals, evolving with every session you
            complete.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm text-black transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #A8FF78)",
                boxShadow: "0 8px 40px rgba(0,212,255,0.4)",
              }}
            >
              Start Learning Free
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
            <button
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              ▶ Watch Demo
            </button>
          </div>

          {/* Multilingual pill row */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["English", "Deutsch", "العربية", "Français", "Español", "中文", "+7"].map((l, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {l}
              </span>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {["#00D4FF", "#A8FF78", "#FF6B6B", "#FFD580", "#C4B5FD"].map(
                (c, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      background: c + "22",
                      border: `2px solid ${c}44`,
                      color: c,
                      borderColor: "#050508",
                    }}
                  >
                    {["K", "S", "A", "M", "L"][i]}
                  </div>
                )
              )}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ color: "#FFD580", fontSize: 12 }}>
                    ★
                  </span>
                ))}
                <span className="text-white text-xs font-bold ml-1">4.98</span>
              </div>
              <div
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                2.4M learners in 190 countries
              </div>
            </div>
          </div>
        </div>

        {/* Future Twin Orb */}
        <div className="relative items-center justify-center hidden lg:flex">
          <div
            className="relative"
            style={{ filter: "drop-shadow(0 0 60px rgba(0,212,255,0.2))" }}
          >
            <FutureTwinOrb size={340} />
          </div>
          {/* Labels */}
          <div
            className="absolute top-8 left-0 px-4 py-2 rounded-2xl text-xs font-semibold"
            style={{
              background: "rgba(255,165,0,0.1)",
              border: "1px solid rgba(255,165,0,0.25)",
              color: "#FFD580",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            YOU · TODAY
          </div>
          <div
            className="absolute bottom-8 right-0 px-4 py-2 rounded-2xl text-xs font-semibold"
            style={{
              background: "rgba(168,255,120,0.08)",
              border: "1px solid rgba(168,255,120,0.25)",
              color: "#A8FF78",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            YOU · +2 YEARS
          </div>

          {/* Floating metric cards */}
          <div
            className="absolute -top-4 -right-8 px-4 py-3 rounded-2xl animate-float-a"
            style={{
              background: "rgba(13,17,23,0.9)",
              border: "1px solid rgba(0,212,255,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              className="text-xs mb-1"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
              }}
            >
              PROJECTED SALARY
            </div>
            <div
              className="text-lg font-black"
              style={{ fontFamily: "'Space Mono', monospace", color: "#A8FF78" }}
            >
              $142k
            </div>
            <div className="text-xs" style={{ color: "rgba(168,255,120,0.6)" }}>
              ↑ 84% from now
            </div>
          </div>

          <div
            className="absolute -bottom-4 -left-8 px-4 py-3 rounded-2xl animate-float-b"
            style={{
              background: "rgba(13,17,23,0.9)",
              border: "1px solid rgba(0,212,255,0.15)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              className="text-xs mb-1"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
              }}
            >
              SKILL READINESS
            </div>
            <div
              className="text-lg font-black"
              style={{ fontFamily: "'Space Mono', monospace", color: "#00D4FF" }}
            >
              94.2%
            </div>
            <div className="text-xs" style={{ color: "rgba(0,212,255,0.6)" }}>
              ML Engineer role
            </div>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div
        className="relative border-t border-b overflow-hidden py-3"
        style={{ borderColor: "rgba(0,212,255,0.08)" }}
      >
        <div
          className="animate-ticker"
          style={{ whiteSpace: "nowrap", display: "inline-block" }}
        >
          {Array(3)
            .fill([
              "🤖 AI Mentor",
              "🌍 13 Languages",
              "🔮 Future Twin AI",
              "🧬 Skill DNA",
              "🏆 Verified Certs",
              "👥 Community",
              "📊 Smart Analytics",
              "🎯 Career Intelligence",
              "📚 1,200+ Courses",
              "⚡ Live Classes",
            ])
            .flat()
            .map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 mx-8 text-sm"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                }}
              >
                {t}
                <span style={{ color: "rgba(0,212,255,0.3)" }}>·</span>
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
