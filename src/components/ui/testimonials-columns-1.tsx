"use client";

import React from "react";
import { motion } from "framer-motion";

type Testimonial = {
  text: string;
  logoSrc?: string | null;
  initials?: string;
  name: string;
  role: string;
};

type TestimonialsColumnProps = {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
};

export const TestimonialsColumn: React.FC<TestimonialsColumnProps> = ({
  className,
  testimonials,
  duration = 10,
}) => {
  return (
    <div
      className={[
        "relative overflow-hidden bg-background",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {Array.from({ length: 2 }).map((_, columnIndex) => (
          <React.Fragment key={columnIndex}>
            {testimonials.map(({ text, logoSrc, initials, name, role }, testimonialIndex) => (
              <div
                className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full"
                key={`${columnIndex}-${testimonialIndex}`}
              >
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  {logoSrc ? (
                    <img
                      width={40}
                      height={40}
                      src={logoSrc}
                      alt={`${name} logo`}
                      className="h-10 w-10 rounded-full object-cover bg-white"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center uppercase">
                      {(initials || name.slice(0, 2)).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">{name}</div>
                    <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
