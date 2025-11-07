import React from "react";
import { Link } from "react-router-dom";
import WordRotator from "./WordRotator";

const rotatingWords = [
  "Unforgettable",
  "Enduring",
  "Profitable",
  "Inevitable",
];

const Hero: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden px-6 py-28 md:py-32 lg:py-40 min-h-[85vh]"
      data-hero-variant="anti-trend"
    >
      <div className="absolute inset-0 hero-surface" aria-hidden="true" />
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="hero-aurora" />
        <div className="hero-orb hero-orb--top-left" />
        <div className="hero-orb hero-orb--center" />
        <div className="hero-orb hero-orb--bottom-right" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 md:gap-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-foreground hero-badge-glow">
            AdGrades
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-foreground hero-title-glow">
            Make Your Brand
            <span className="pl-2 text-accent">
              <WordRotator
                words={rotatingWords}
                interval={2000}
                data-words={rotatingWords.join(",")}
                data-interval="2000"
                pauseOnInteraction
                className="hero-rotator"
              />
            </span>
          </h1>
        </div>

        <p className="max-w-2xl text-base md:text-lg text-foreground/90">
          AdGrades is the anti-trend marketing partner for brands that outlast
          hype. Strategy, creative, and performance—built to compound.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            to="/contact"
            className="brand-button group w-full text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent sm:w-auto"
            data-cta="hero_primary"
          >
            <span className="relative z-10">Get a Growth Plan</span>
          </Link>
          <Link
            to="/clients"
            className="hero-shine-button w-full text-base sm:w-auto"
            data-cta="hero_secondary"
          >
            See Work
          </Link>
        </div>

        <div className="text-sm font-medium text-foreground/80">
          Trusted by 50+ growth-minded teams
        </div>
      </div>
    </section>
  );
};

export default Hero;
