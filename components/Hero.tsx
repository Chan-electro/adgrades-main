"use client";
import { useEffect, useMemo, useRef, useState } from "react";
// If using Next.js Image component, uncomment and swap <img> to <Image>
// import Image from "next/image";
import { serviceStats } from "@/data/servicesData"; // <-- repo data (proof row)

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function WordRotator({
  words = ["Unforgettable", "Enduring", "Profitable", "Inevitable"],
  interval = 2000,
}: { words?: string[]; interval?: number }) {
  const prefersReduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [state, setState] = useState<"typing" | "erasing">("typing");
  const timer = useRef<number | null>(null);
  const list = useMemo(() => words.filter(Boolean), [words]);

  useEffect(() => {
    if (prefersReduced || list.length <= 1) return;
    timer.current = window.setInterval(() => {
      setState("erasing");
      window.setTimeout(() => {
        setI((p) => (p + 1) % list.length);
        setState("typing");
      }, 300);
    }, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [prefersReduced, list.length, interval]);

  return (
    <span
      aria-live="polite"
      className={state === "typing" ? "animate-typing" : "animate-erase"}
      // Reserve width for widest word to avoid CLS; NO cursor line anywhere
      style={{ display: "inline-block", minWidth: "12ch", whiteSpace: "nowrap" }}
    >
      {list[i]}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      role="banner"
      aria-label="AdGrades hero section"
      className="relative overflow-hidden"
    >
      {/* Background: match the rest of the site */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0D0B12] via-[#120A1B] to-[#0B0A12]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(60%_50%_at_80%_15%,#C67BE526,transparent_60%)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 md:pt-28 md:pb-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* LEFT: copy */}
          <div>
            <p className="text-xs md:text-sm tracking-[0.22em] text-white/70">
              ADGRADES
            </p>

            {/* Larger fluid headline; accent on rotating word */}
            <h1 className="mt-3 font-extrabold leading-tight tracking-tight text-white text-[clamp(40px,8vw,96px)]">
              Make Your Brand{" "}
              <span className="text-[#B98CFF]">
                <WordRotator />
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg text-white/80">
              The anti-trend marketing partner for brands that outlast hype—strategy,
              creative, and performance built to compound.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                aria-label="Get a Growth Plan"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-white bg-[#A061FF] hover:bg-[#8D49FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A061FF] focus-visible:ring-offset-black"
                data-cta="hero_primary"
              >
                Get a Growth Plan
              </a>
              <a
                href="#work"
                aria-label="See Work"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold border border-white/20 text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-black"
                data-cta="hero_secondary"
              >
                See Work
              </a>
            </div>

            {/* Proof line fed by repo's serviceStats */}
            <ul className="mt-8 grid grid-cols-2 gap-3 max-w-lg text-white/80 sm:grid-cols-4">
              {serviceStats.slice(0, 4).map((s, idx) => (
                <li key={idx} className="rounded-xl border border-white/10 px-3 py-2 text-center">
                  <div className="text-lg font-bold">
                    {s.number}
                    {s.suffix}
                  </div>
                  <div className="text-[11px] opacity-80">{s.label}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: static 3D marketing image */}
          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(40% 40% at 60% 40%, #B98CFF33 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            {/* If using Next/Image, replace with <Image ... /> */}
            <img
              src="/illustrations/marketing-3d.png"
              alt="Illustration: marketing analytics dashboard in 3D"
              width={900}
              height={700}
              loading="lazy"
              decoding="async"
              className="w-full h-auto select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
