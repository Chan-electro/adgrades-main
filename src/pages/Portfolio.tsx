import { useCallback, useMemo, useState } from "react";
import {
  clientChannels,
  type ClientChannel,
  type Outcome,
  getPortfolioDateBounds,
} from "@/data/portfolioData";
import { OutcomeFilters, type OutcomeFilterValue } from "@/components/portfolio/OutcomeFilters";
import { Timebar, type TimelinePoint } from "@/components/portfolio/Timebar";
import { ChannelGrid } from "@/components/portfolio/ChannelGrid";
import { ChannelDrawer } from "@/components/portfolio/ChannelDrawer";
import { PlaylistPanel } from "@/components/portfolio/PlaylistPanel";
import { PlaylistProvider } from "@/components/portfolio/PlaylistContext";
import {
  getArtifactsForOutcome,
  getLatestKPIForOutcome,
  getMostRecentKPI,
} from "@/components/portfolio/utils";

function buildTimelinePoints(clients: ClientChannel[]): TimelinePoint[] {
  const { min, max } = getPortfolioDateBounds(clients);
  if (!min || !max) {
    const today = new Date();
    const label = today.toLocaleDateString(undefined, { month: "short", year: "numeric" });
    return [{ date: today, label, key: `${today.getFullYear()}-${today.getMonth()}` }];
  }

  const start = new Date(min.getFullYear(), min.getMonth(), 1);
  const end = new Date(max.getFullYear(), max.getMonth(), 1);
  const months: TimelinePoint[] = [];
  const cursor = new Date(start);

  while (cursor.getTime() <= end.getTime()) {
    const label = cursor.toLocaleDateString(undefined, { month: "short", year: "numeric" });
    months.push({
      date: new Date(cursor),
      label,
      key: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
}

function getLatestArtifactTimestamp(client: ClientChannel, cutoff: number) {
  const timestamps = client.artifacts
    .map((artifact) => new Date(artifact.dateISO).getTime())
    .filter((time) => time <= cutoff);
  return timestamps.length > 0 ? Math.max(...timestamps) : 0;
}

function getOutcomeScore(client: ClientChannel, outcome: Outcome, cutoffDate: Date) {
  const cutoff = cutoffDate.getTime();
  const kpi = getLatestKPIForOutcome(client, outcome, cutoffDate);
  if (kpi) {
    return {
      priority: 2,
      value: kpi.value,
      latest: new Date(kpi.dateISO).getTime(),
    };
  }

  const artifacts = getArtifactsForOutcome(client.artifacts, outcome).filter(
    (artifact) => new Date(artifact.dateISO).getTime() <= cutoff
  );
  return {
    priority: artifacts.length > 0 ? 1 : 0,
    value: artifacts.length,
    latest: getLatestArtifactTimestamp(client, cutoff),
  };
}

export default function Portfolio() {
  const points = useMemo(() => buildTimelinePoints(clientChannels), []);
  const [timeIndex, setTimeIndex] = useState(points.length - 1);
  const [selectedOutcome, setSelectedOutcome] = useState<OutcomeFilterValue>("all");
  const [activeClient, setActiveClient] = useState<ClientChannel | null>(null);

  const selectedDate = useMemo(() => points[timeIndex]?.date ?? new Date(), [points, timeIndex]);

  const sortedClients = useMemo(() => {
    const list = [...clientChannels];
    const cutoff = selectedDate.getTime();

    if (selectedOutcome === "all") {
      return list.sort((a, b) => {
        const latestA = getLatestArtifactTimestamp(a, cutoff);
        const latestB = getLatestArtifactTimestamp(b, cutoff);
        if (latestA !== latestB) {
          return latestB - latestA;
        }
        const kpiA = getMostRecentKPI(a, selectedDate);
        const kpiB = getMostRecentKPI(b, selectedDate);
        if (kpiA && kpiB && kpiA.value !== kpiB.value) {
          return kpiB.value - kpiA.value;
        }
        return a.name.localeCompare(b.name);
      });
    }

    return list.sort((a, b) => {
      const scoreA = getOutcomeScore(a, selectedOutcome, selectedDate);
      const scoreB = getOutcomeScore(b, selectedOutcome, selectedDate);
      if (scoreA.priority !== scoreB.priority) {
        return scoreB.priority - scoreA.priority;
      }
      if (scoreA.value !== scoreB.value) {
        return scoreB.value - scoreA.value;
      }
      if (scoreA.latest !== scoreB.latest) {
        return scoreB.latest - scoreA.latest;
      }
      return a.name.localeCompare(b.name);
    });
  }, [selectedOutcome, selectedDate]);

  const handleSelectClient = useCallback((client: ClientChannel) => {
    setActiveClient(client);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setActiveClient(null);
  }, []);

  const timebar = useCallback(
    () => (
      <Timebar points={points} valueIndex={timeIndex} onChange={setTimeIndex} />
    ),
    [points, timeIndex]
  );

  return (
    <PlaylistProvider>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <header className="mb-10 space-y-3">
          <p className="text-sm uppercase tracking-wide text-primary">Signal Board</p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Proof of performance across every AdGrades client
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Switch channels, scrub through campaigns, and pin the artifacts that matter. Add a new client
            once and see it instantly reflected everywhere.
          </p>
        </header>

        <section className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <OutcomeFilters value={selectedOutcome} onChange={setSelectedOutcome} />
            <div className="w-full max-w-sm lg:w-auto">{timebar()}</div>
          </div>

          <ChannelGrid
            clients={sortedClients}
            selectedOutcome={selectedOutcome}
            onSelectClient={handleSelectClient}
            currentDate={selectedDate}
          />
        </section>
      </main>

      <ChannelDrawer
        client={activeClient}
        isOpen={Boolean(activeClient)}
        onClose={handleCloseDrawer}
        currentDate={selectedDate}
        renderTimebar={timebar}
      />

      <PlaylistPanel />
    </PlaylistProvider>
  );
}
