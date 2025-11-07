import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  reverse = false,
  pauseOnHover = false,
  className = ''
}) => {
  return (
    <div
      className={`group flex overflow-hidden p-2 [--duration:30s] [--gap:0.5rem] sm:[--gap:1rem] [gap:var(--gap)] ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
      }}
    >
      <div
        className={`flex shrink-0 justify-around [gap:var(--gap)] animate-marquee ${
          reverse ? '[animation-direction:reverse]' : ''
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
      >
        {children}
      </div>
      <div
        className={`flex shrink-0 justify-around [gap:var(--gap)] animate-marquee ${
          reverse ? '[animation-direction:reverse]' : ''
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        aria-hidden="true"
      >
        {children}
      </div>
      <div
        className={`flex shrink-0 justify-around [gap:var(--gap)] animate-marquee ${
          reverse ? '[animation-direction:reverse]' : ''
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee;