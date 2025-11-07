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
      <main className="bg-gradient-to-b from-background via-background/95 to-muted/60">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 lg:px-10">
          <header className="rounded-3xl border border-border/60 bg-card/90 p-8 shadow-sm backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">Signal Board</p>
            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="space-y-5">
                <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Proof of performance across every AdGrades client
                </h1>
                <p className="max-w-3xl text-base text-muted-foreground lg:text-lg">
                  Explore every campaign artifact, scrub timelines to see the work unfold, and surface
                  outcomes that match your goals. Add a client once and their entire signal history is ready
                  to showcase.
                </p>
              </div>
              <div className="hidden rounded-2xl border border-border/70 bg-muted/40 p-5 text-sm text-muted-foreground shadow-inner lg:block">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/80">
                  How to explore
                </h2>
                <ul className="mt-3 space-y-2">
                  <li>• Filter by the outcome you care about.</li>
                  <li>• Scrub the timeline to narrow to a moment in time.</li>
                  <li>• Open any client to view channel tabs and playlist items.</li>
                </ul>
              </div>
            </div>
          </header>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
            <aside className="space-y-6 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur lg:sticky lg:top-24 lg:h-fit">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Prioritise an outcome
                </h2>
                <OutcomeFilters value={selectedOutcome} onChange={setSelectedOutcome} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                  <span>Timeline</span>
                  <span>{points[timeIndex]?.label}</span>
                </div>
                <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 shadow-inner">
                  {timebar()}
                </div>
              </div>
            </aside>

            <section className="space-y-6">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="text-lg font-semibold text-foreground md:text-xl">
                  {selectedOutcome === "all" ? "All client signals" : `Signals optimised for ${selectedOutcome}`}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Showing {sortedClients.length} client{sortedClients.length === 1 ? "" : "s"}
                </p>
              </div>
              <ChannelGrid
                clients={sortedClients}
                selectedOutcome={selectedOutcome}
                onSelectClient={handleSelectClient}
                currentDate={selectedDate}
              />
            </section>
          </div>
        </div>
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
