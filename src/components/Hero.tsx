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
      className="relative mx-auto max-w-6xl px-6 py-20 md:py-28"
      data-hero-variant="anti-trend"
    >
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            AdGrades
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-foreground">
            Make Your Brand
            <span className="text-accent">
              <WordRotator
                words={rotatingWords}
                interval={2000}
                data-words={rotatingWords.join(",")}
                data-interval="2000"
                pauseOnInteraction
                className="pl-2"
              />
            </span>
          </h1>
        </div>

        <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
          AdGrades is the anti-trend marketing partner for brands that outlast
          hype. Strategy, creative, and performance—built to compound.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-accent shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            data-cta="hero_primary"
          >
            Get a Growth Plan
          </Link>
          <Link
            to="/clients"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold border border-border text-foreground transition hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            data-cta="hero_secondary"
          >
            See Work
          </Link>
        </div>

        <div className="text-sm text-muted-foreground">
          Trusted by 50+ growth-minded teams
        </div>
      </div>
    </section>
  );
};

export default Hero;
