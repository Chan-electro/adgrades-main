import { outcomes, type Outcome } from "@/data/portfolioData";

type OutcomeFilterValue = Outcome | "all";

interface OutcomeFiltersProps {
  value: OutcomeFilterValue;
  onChange: (value: OutcomeFilterValue) => void;
}

const outcomeLabels: Record<OutcomeFilterValue, string> = {
  all: "Latest",
  leads: "Leads",
  sales: "Sales",
  roas: "ROAS",
  visibility: "Visibility",
  community: "Community",
};

export function OutcomeFilters({ value, onChange }: OutcomeFiltersProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="radiogroup"
      aria-label="Outcome filters"
      data-analytics-id="portfolio-outcome-filters"
    >
      {["all", ...outcomes].map((option) => {
        const label = outcomeLabels[option as OutcomeFilterValue];
        const isActive = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option as OutcomeFilterValue)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isActive
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-foreground"
            }`}
            data-analytics-event="portfolio.outcome.change"
            data-analytics-value={option}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export type { OutcomeFilterValue };
