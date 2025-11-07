import type { ClientChannel, Outcome, Artifact } from "@/data/portfolioData";

const outcomeLabelMatch: Record<Outcome, (label: string) => boolean> = {
  leads: (label) => label.toLowerCase().includes("lead"),
  sales: (label) => label.toLowerCase().includes("sale"),
  roas: (label) => label.toLowerCase().includes("roas"),
  visibility: (label) =>
    ["visibility", "impressions", "reach", "footfall"].some((token) => label.toLowerCase().includes(token)),
  community: (label) => label.toLowerCase().includes("community"),
};

export function getLatestKPIForOutcome(
  client: ClientChannel,
  outcome: Outcome,
  cutoffDate?: Date
) {
  const cutoff = cutoffDate ? cutoffDate.getTime() : Number.POSITIVE_INFINITY;
  const entries = client.kpis
    .filter((kpi) => new Date(kpi.dateISO).getTime() <= cutoff)
    .filter((kpi) => outcomeLabelMatch[outcome](kpi.label))
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  return entries[0] ?? null;
}

export function getMostRecentKPI(client: ClientChannel, cutoffDate?: Date) {
  const cutoff = cutoffDate ? cutoffDate.getTime() : Number.POSITIVE_INFINITY;
  const sorted = [...client.kpis]
    .filter((kpi) => new Date(kpi.dateISO).getTime() <= cutoff)
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  return sorted[0] ?? null;
}

export function getArtifactsForOutcome(artifacts: Artifact[], outcome: Outcome) {
  return artifacts.filter((artifact) => artifact.outcomes.includes(outcome));
}

export function formatKPI(kpi: { label: string; value: number; unit?: string | null }) {
  if (!kpi) return null;
  const unit = kpi.unit ?? "";
  const value = unit === "%" ? `${kpi.value}${unit}` : `${kpi.value}${unit}`;
  return `${kpi.label}: ${value}`;
}

export function formatDateISO(dateISO: string) {
  return new Date(dateISO).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

export function getArtifactsForTab(artifacts: Artifact[], tab: string) {
  if (tab === "story") {
    return artifacts.filter(
      (artifact) => artifact.type === "video" && artifact.aspect === "9:16"
    );
  }
  if (tab === "reel") {
    return artifacts.filter((artifact) => artifact.type === "video");
  }
  if (tab === "posters") {
    return artifacts.filter((artifact) => artifact.type === "poster");
  }
  if (tab === "social") {
    return artifacts.filter((artifact) => artifact.type === "social");
  }
  if (tab === "web") {
    return artifacts.filter((artifact) => artifact.type === "web");
  }
  return artifacts;
}
