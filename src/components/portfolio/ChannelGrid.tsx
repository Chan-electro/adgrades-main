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
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
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
      className="group relative overflow-hidden rounded-2xl border border-border bg-background/80 p-5 shadow-sm transition hover:shadow-lg"
      data-analytics-event="portfolio.channel.open"
      data-analytics-value={client.id}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full flex-col gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={`Open ${client.name} signal board`}
      >
        <div className="flex items-center gap-3">
          <img
            src={client.logo}
            alt={client.name}
            className="h-11 w-11 shrink-0 rounded-lg border border-border bg-white object-contain p-1"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="text-base font-semibold leading-tight text-foreground">{client.name}</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{client.industry}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{metric.label}</p>
          <p>{metric.value}</p>
          {latestArtifactDate && <p>Last signal: {latestArtifactDate}</p>}
          <p>
            Artifacts: {client.artifacts.length} • Socials: {client.socials.length}
          </p>
        </div>
      </button>
    </li>
  );
}
