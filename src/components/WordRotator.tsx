import React, { useEffect, useMemo, useRef, useState } from "react";

type WordRotatorProps = React.HTMLAttributes<HTMLSpanElement> & {
  words?: string[];
  interval?: number;
  respectReducedMotion?: boolean;
  pauseOnInteraction?: boolean;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreference);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updatePreference);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updatePreference);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updatePreference);
      }
    };
  }, []);

  return prefersReducedMotion;
}

export function WordRotator({
  words = ["Unforgettable", "Enduring", "Profitable", "Inevitable"],
  interval = 2000,
  respectReducedMotion = true,
  pauseOnInteraction = true,
  className = "",
  style,
  ...spanProps
}: WordRotatorProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const availableWords = useMemo(
    () => words.filter((word): word is string => Boolean(word && word.trim())),
    [words]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "erasing">("typing");
  const rotationTimeout = useRef<number | null>(null);
  const phaseTimeout = useRef<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const shouldRespectMotion = respectReducedMotion && prefersReducedMotion;
  const shouldPause = pauseOnInteraction && isInteracting;
  const longestWordLength = useMemo(() => {
    if (availableWords.length === 0) {
      return 0;
    }
    return availableWords.reduce(
      (longest, word) => Math.max(longest, word.length),
      0
    );
  }, [availableWords]);

  useEffect(() => {
    setCurrentIndex((previousIndex) => {
      if (availableWords.length === 0) {
        return 0;
      }
      if (previousIndex >= availableWords.length) {
        return 0;
      }
      return previousIndex;
    });
  }, [availableWords]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    if (shouldRespectMotion || availableWords.length <= 1 || shouldPause) {
      setPhase("typing");
      return () => {
        if (rotationTimeout.current) {
          window.clearTimeout(rotationTimeout.current);
          rotationTimeout.current = null;
        }
        if (phaseTimeout.current) {
          window.clearTimeout(phaseTimeout.current);
          phaseTimeout.current = null;
        }
      };
    }

    const scheduleRotation = () => {
      rotationTimeout.current = window.setTimeout(() => {
        setPhase("erasing");
        phaseTimeout.current = window.setTimeout(() => {
          setCurrentIndex((previous) =>
            previous + 1 >= availableWords.length ? 0 : previous + 1
          );
          setPhase("typing");
          scheduleRotation();
        }, 140);
      }, interval);
    };

    scheduleRotation();

    return () => {
      if (rotationTimeout.current) {
        window.clearTimeout(rotationTimeout.current);
        rotationTimeout.current = null;
      }
      if (phaseTimeout.current) {
        window.clearTimeout(phaseTimeout.current);
        phaseTimeout.current = null;
      }
    };
  }, [availableWords, interval, shouldRespectMotion, shouldPause]);

  useEffect(() => {
    return () => {
      if (typeof window === "undefined") {
        return;
      }
      if (rotationTimeout.current) {
        window.clearTimeout(rotationTimeout.current);
      }
      if (phaseTimeout.current) {
        window.clearTimeout(phaseTimeout.current);
      }
    };
  }, []);

  const combinedClassName = [
    "inline-flex items-baseline align-baseline whitespace-nowrap",
    shouldRespectMotion
      ? ""
      : phase === "typing"
      ? "hero-word-typing"
      : "hero-word-erasing",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const minWidthStyle = longestWordLength
    ? { minWidth: `calc(${longestWordLength}ch + 0.25rem)` }
    : undefined;

  return (
    <span
      {...spanProps}
      aria-live={spanProps["aria-live"] ?? "polite"}
      data-words={spanProps["data-words"] ?? availableWords.join(",")}
      data-interval={spanProps["data-interval"] ?? interval}
      className={combinedClassName}
      style={{
        ...minWidthStyle,
        ...style,
      }}
      onMouseEnter={(event) => {
        spanProps.onMouseEnter?.(event);
        if (pauseOnInteraction) {
          setIsInteracting(true);
        }
      }}
      onMouseLeave={(event) => {
        spanProps.onMouseLeave?.(event);
        if (pauseOnInteraction) {
          setIsInteracting(false);
        }
      }}
      onFocus={(event) => {
        spanProps.onFocus?.(event);
        if (pauseOnInteraction) {
          setIsInteracting(true);
        }
      }}
      onBlur={(event) => {
        spanProps.onBlur?.(event);
        if (pauseOnInteraction) {
          setIsInteracting(false);
        }
      }}
    >
      {availableWords[currentIndex] ?? ""}
    </span>
  );
}

export default WordRotator;
