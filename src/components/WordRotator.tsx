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
  const initialWord = availableWords[0] ?? "";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(initialWord);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const typingTimeout = useRef<number | null>(null);
  const holdTimeout = useRef<number | null>(null);

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
    setDisplayText(initialWord);
    setCurrentIndex(0);
    setIsDeleting(false);
  }, [initialWord]);

  useEffect(() => {
    if (!availableWords.length) {
      setDisplayText("");
      setCurrentIndex(0);
      setIsDeleting(false);
      return;
    }

    if (currentIndex >= availableWords.length) {
      setCurrentIndex(0);
      setDisplayText(availableWords[0] ?? "");
      setIsDeleting(false);
    }
  }, [availableWords, currentIndex]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    if (typingTimeout.current) {
      window.clearTimeout(typingTimeout.current);
      typingTimeout.current = null;
    }
    if (holdTimeout.current) {
      window.clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }

    if (shouldRespectMotion || availableWords.length <= 1 || shouldPause) {
      const word = availableWords[currentIndex] ?? availableWords[0] ?? "";
      setDisplayText(word);
      setIsDeleting(false);
      return undefined;
    }

    const activeWord = availableWords[currentIndex] ?? "";

    if (!isDeleting && displayText === activeWord) {
      holdTimeout.current = window.setTimeout(() => {
        setIsDeleting(true);
      }, interval);
      return () => {
        if (holdTimeout.current) {
          window.clearTimeout(holdTimeout.current);
          holdTimeout.current = null;
        }
      };
    }

    if (isDeleting && displayText.length === 0) {
      holdTimeout.current = window.setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((previous) =>
          previous + 1 >= availableWords.length ? 0 : previous + 1
        );
      }, 120);
      return () => {
        if (holdTimeout.current) {
          window.clearTimeout(holdTimeout.current);
          holdTimeout.current = null;
        }
      };
    }

    const stepDelay = isDeleting ? 45 : 90;

    typingTimeout.current = window.setTimeout(() => {
      setDisplayText((previousText) => {
        if (isDeleting) {
          return previousText.slice(0, Math.max(previousText.length - 1, 0));
        }
        return activeWord.slice(0, previousText.length + 1);
      });
    }, stepDelay);

    return () => {
      if (typingTimeout.current) {
        window.clearTimeout(typingTimeout.current);
        typingTimeout.current = null;
      }
    };
  }, [
    availableWords,
    currentIndex,
    displayText,
    interval,
    isDeleting,
    shouldPause,
    shouldRespectMotion,
  ]);

  useEffect(() => {
    return () => {
      if (typeof window === "undefined") {
        return;
      }
      if (typingTimeout.current) {
        window.clearTimeout(typingTimeout.current);
      }
      if (holdTimeout.current) {
        window.clearTimeout(holdTimeout.current);
      }
    };
  }, []);

  const combinedClassName = [
    "inline-flex items-center align-middle whitespace-nowrap leading-tight",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const minWidthStyle = longestWordLength
    ? { minWidth: `calc(${longestWordLength}ch + 0.45rem)` }
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
      {displayText}
    </span>
  );
}

export default WordRotator;
