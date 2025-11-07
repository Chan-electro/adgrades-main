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
      className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-36 min-h-[80vh]"
      data-hero-variant="anti-trend"
    >
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="hero-aurora" />
        <div className="hero-orb hero-orb--top-left" />
        <div className="hero-orb hero-orb--center" />
        <div className="hero-orb hero-orb--bottom-right" />
      </div>

      <div className="relative z-10 flex flex-col gap-10 md:gap-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-foreground/90">
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

        <p className="max-w-2xl text-base md:text-lg text-foreground/80">
          AdGrades is the anti-trend marketing partner for brands that outlast
          hype. Strategy, creative, and performance—built to compound.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Link
            to="/contact"
            className="brand-button group text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            data-cta="hero_primary"
          >
            <span className="relative z-10">Get a Growth Plan</span>
          </Link>
          <Link
            to="/clients"
            className="hero-shine-button text-base"
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
