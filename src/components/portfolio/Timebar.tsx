import { useId } from "react";

interface TimelinePoint {
  date: Date;
  label: string;
  key: string;
}

interface TimebarProps {
  points: TimelinePoint[];
  valueIndex: number;
  onChange: (nextIndex: number) => void;
}

export function Timebar({ points, valueIndex, onChange }: TimebarProps) {
  const sliderId = useId();
  const clampedIndex = Math.min(Math.max(valueIndex, 0), points.length - 1);
  const current = points[clampedIndex];

  return (
    <div className="space-y-2" data-analytics-id="portfolio-timebar">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Scrub by month</span>
        <span className="font-medium text-foreground">{current.label}</span>
      </div>
      <input
        id={sliderId}
        type="range"
        className="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-muted"
        min={0}
        max={Math.max(points.length - 1, 0)}
        step={1}
        value={clampedIndex}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        aria-label="Filter artifacts by month"
        aria-valuemin={0}
        aria-valuemax={Math.max(points.length - 1, 0)}
        aria-valuenow={clampedIndex}
        aria-valuetext={current.label}
        data-analytics-event="portfolio.timebar.scrub"
        data-analytics-value={current.key}
      />
      <div className="flex justify-between text-[11px] uppercase text-muted-foreground">
        <span>{points[0]?.label}</span>
        <span>{points.at(-1)?.label}</span>
      </div>
    </div>
  );
}

export type { TimelinePoint };
