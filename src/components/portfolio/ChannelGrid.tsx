import { useMemo } from "react";
import type { ClientChannel } from "@/data/portfolioData";
import type { OutcomeFilterValue } from "./OutcomeFilters";
import {
  formatDateISO,
  formatKPI,
  getArtifactsForOutcome,
  getLatestKPIForOutcome,
  getMostRecentKPI,
} from "./utils";

interface ChannelGridProps {
  clients: ClientChannel[];
  selectedOutcome: OutcomeFilterValue;
  onSelectClient: (client: ClientChannel) => void;
  currentDate: Date;
}

export function ChannelGrid({ clients, selectedOutcome, onSelectClient, currentDate }: ChannelGridProps) {
  return (
    <ul
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      data-analytics-id="portfolio-grid"
    >
      {clients.map((client) => (
        <ChannelTile
          key={client.id}
          client={client}
          selectedOutcome={selectedOutcome}
          onSelect={() => onSelectClient(client)}
          currentDate={currentDate}
        />
      ))}
    </ul>
  );
}

function ChannelTile({
  client,
  selectedOutcome,
  onSelect,
  currentDate,
}: {
  client: ClientChannel;
  selectedOutcome: OutcomeFilterValue;
  onSelect: () => void;
  currentDate: Date;
}) {
  const metric = useMemo(() => {
    if (selectedOutcome === "all") {
      const kpi = getMostRecentKPI(client, currentDate);
      if (kpi) {
        return {
          label: "Latest result",
          value: formatKPI(kpi),
        };
      }
      return {
        label: "Signals in playlist",
        value: `${client.artifacts.length} artifacts`,
      };
    }

    const kpi = getLatestKPIForOutcome(client, selectedOutcome, currentDate);
    if (kpi) {
      return {
        label: `${selectedOutcome.charAt(0).toUpperCase()}${selectedOutcome.slice(1)}`,
        value: formatKPI(kpi),
      };
    }

    const relevantArtifacts = getArtifactsForOutcome(client.artifacts, selectedOutcome);
    return {
      label: "Signals",
      value: `${relevantArtifacts.length} items supporting ${selectedOutcome}`,
    };
  }, [client, selectedOutcome, currentDate]);

  const latestArtifactDate = useMemo(() => {
    const sorted = [...client.artifacts]
      .filter((artifact) => new Date(artifact.dateISO).getTime() <= currentDate.getTime())
      .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
    return sorted[0] ? formatDateISO(sorted[0].dateISO) : null;
  }, [client.artifacts, currentDate]);

  return (
    <li
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-md transition duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl"
      data-analytics-event="portfolio.channel.open"
      data-analytics-value={client.id}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full flex-col gap-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={`Open ${client.name} signal board`}
      >
        <div className="flex items-center gap-4">
          <img
            src={client.logo}
            alt={client.name}
            className="h-12 w-12 shrink-0 rounded-xl border border-border/70 bg-white object-contain p-1.5 shadow-sm transition group-hover:scale-105"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="text-base font-semibold leading-tight text-foreground md:text-lg">
              {client.name}
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {client.industry}
            </p>
          </div>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/80">{metric.label}</p>
            <p className="mt-1 text-base font-semibold text-foreground">{metric.value}</p>
          </div>
          {latestArtifactDate && (
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Last signal {latestArtifactDate}
            </p>
          )}
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-muted-foreground/80">
            <span className="rounded-full bg-background/80 px-3 py-1 font-medium">
              {client.artifacts.length} artifacts
            </span>
            <span className="rounded-full bg-background/80 px-3 py-1 font-medium">
              {client.socials.length} socials
            </span>
          </div>
        </div>
      </button>
    </li>
  );
}
