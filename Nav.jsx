import { useState, useEffect } from "react";

export default function Nav({ active, setActive, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langs = ["EN", "DE", "AR", "FR", "ES", "ZH", "JA"];
  const navItems = ["Home", "Academy", "AI Mentor", "Future Twin", "Career", "Community"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(32px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="relative w-8 h-8">
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #A8FF78)",
                opacity: 0.15,
              }}
            />
            <div
              className="absolute inset-0 rounded-xl flex items-center justify-center"
              style={{ border: "1px solid rgba(0,212,255,0.4)" }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  fontSize: 11,
                  color: "#00D4FF",
                }}
              >
                M
              </span>
            </div>
          </div>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 18,
              color: "#fff",
              letterSpacing: "-0.01em",
            }}
          >
            Mentora{" "}
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                color: "#00D4FF",
                letterSpacing: "0.05em",
              }}
            >
              AI
            </span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                color: active === item ? "#00D4FF" : "rgba(255,255,255,0.45)",
                background:
                  active === item ? "rgba(0,212,255,0.08)" : "transparent",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Lang switcher */}
          <div
            className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-1.5 py-0.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background:
                    lang === l ? "rgba(0,212,255,0.2)" : "transparent",
                  color: lang === l ? "#00D4FF" : "rgba(255,255,255,0.3)",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            className="text-sm px-4 py-2 rounded-xl font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Sign in
          </button>
          <button
            className="text-sm px-5 py-2 rounded-xl font-semibold text-black transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00D4FF, #A8FF78)",
              boxShadow: "0 4px 20px rgba(0,212,255,0.35)",
            }}
          >
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
}
