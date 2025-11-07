import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import type { ClientChannel, Artifact } from "@/data/portfolioData";
import { usePlaylist } from "./PlaylistContext";
import { getArtifactsForTab } from "./utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ChannelDrawerProps {
  client: ClientChannel | null;
  isOpen: boolean;
  onClose: () => void;
  currentDate: Date;
  renderTimebar?: () => React.ReactNode;
}

const tabs = [
  { id: "reel", label: "Reel", description: "Vertical edits, reels, trailers" },
  { id: "posters", label: "Posters", description: "Print + digital posters" },
  { id: "social", label: "Social", description: "Organic + paid social" },
  { id: "web", label: "Web", description: "Landing pages & microsites" },
  { id: "story", label: "Story", description: "Story-format cutdowns" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ChannelDrawer({ client, isOpen, onClose, currentDate, renderTimebar }: ChannelDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("reel");
  const [logoFailed, setLogoFailed] = useState(false);
  const { addItem, removeItem, isPinned } = usePlaylist();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const getFocusable = () =>
      drawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

    const focusFirst = () => {
      const focusableElements = getFocusable();
      focusableElements[0]?.focus();
    };

    focusFirst();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "Tab") {
        const focusableElements = getFocusable();
        if (focusableElements.length === 0) return;
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const handleFocusOutside = (event: FocusEvent) => {
      if (drawer && !drawer.contains(event.target as Node)) {
        focusFirst();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusOutside);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusOutside);
      previousActive?.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!client || !isOpen) return;
    const availableTabs = tabs.filter((tab) =>
      getArtifactsForTab(client.artifacts, tab.id).some(
        (artifact) => new Date(artifact.dateISO).getTime() <= currentDate.getTime()
      )
    );
    if (availableTabs.length > 0) {
      setActiveTab(availableTabs[0].id);
    } else {
      setActiveTab("reel");
    }
  }, [client, currentDate, isOpen]);

  useEffect(() => {
    setLogoFailed(false);
  }, [client?.id]);

  const filteredArtifacts = useMemo(() => {
    if (!client || !isOpen) return [] as Artifact[];
    const cutoff = currentDate.getTime();
    return client.artifacts
      .filter((artifact) => new Date(artifact.dateISO).getTime() <= cutoff)
      .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  }, [client, currentDate, isOpen]);

  const tabArtifacts = useMemo(
    () => getArtifactsForTab(filteredArtifacts, activeTab),
    [filteredArtifacts, activeTab]
  );

  const initials = useMemo(() => {
    if (!client) return "";
    return client.name
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2);
  }, [client]);

  const hasLogo = Boolean(client?.logo) && !logoFailed;
  const showFallback = !hasLogo;

  if (!client || !isOpen) return null;

  const handleOverlayClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const togglePlaylist = (artifact: Artifact) => {
    if (isPinned(artifact.id, client.id)) {
      removeItem(artifact.id, client.id);
    } else {
      addItem({ ...artifact, clientId: client.id, clientName: client.name });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 py-8 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${client.name} signal board`}
      onClick={handleOverlayClick}
    >
      <div
        ref={drawerRef}
        className="max-h-full w-full max-w-5xl overflow-y-auto rounded-3xl border border-border bg-background p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {showFallback ? (
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary/10 text-base font-semibold uppercase text-primary">
                <span aria-hidden="true">{initials}</span>
                <span className="sr-only">{client.name}</span>
              </div>
            ) : (
              <img
                src={client.logo as string}
                alt={client.name}
                className="h-12 w-12 rounded-xl border border-border bg-white object-contain p-1"
                loading="lazy"
                onError={() => setLogoFailed(true)}
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold text-foreground">{client.name}</h2>
              <p className="text-sm uppercase tracking-wide text-muted-foreground">{client.industry}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-3 py-1 text-sm font-semibold text-muted-foreground transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Close
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[2fr,1fr]">
          <div className="space-y-3">
            {renderTimebar && renderTimebar()}
            <nav
              role="tablist"
              aria-label="Artifact types"
              className="flex flex-wrap items-center gap-2"
            >
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`tab-panel-${tab.id}`}
                    id={`tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(event) => handleTabKeyboard(event, tab.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isActive
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                    }`}
                    type="button"
                    data-analytics-event="portfolio.drawer.tab"
                    data-analytics-value={tab.id}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
            <p className="text-sm text-muted-foreground">
              {tabs.find((tab) => tab.id === activeTab)?.description}
            </p>
            <section
              id={`tab-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="space-y-4"
            >
              {tabArtifacts.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                  No artifacts for this format before {currentDate.toLocaleDateString()}.
                </p>
              ) : (
                tabArtifacts.map((artifact) => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    onTogglePlaylist={() => togglePlaylist(artifact)}
                    pinned={isPinned(artifact.id, client.id)}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))
              )}
            </section>
          </div>

          <aside className="space-y-6 rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Outcomes</h3>
              <ul className="mt-2 space-y-1">
                {client.kpis.length === 0 && (
                  <li className="text-xs">No KPIs reported yet.</li>
                )}
                {[...client.kpis]
                  .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
                  .map((kpi) => (
                    <li key={`${kpi.label}-${kpi.dateISO}`}>
                      <span className="font-medium text-foreground">{kpi.label}</span>{" "}
                      <span>
                        {kpi.value}
                        {kpi.unit}
                      </span>{" "}
                      <span className="text-xs">({new Date(kpi.dateISO).toLocaleDateString()})</span>
                    </li>
                  ))}
              </ul>
            </div>

            {client.summary && (
              <div className="space-y-4">
                {client.summary.challenge && (
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">Challenge</h4>
                    <p>{client.summary.challenge}</p>
                  </div>
                )}
                {client.summary.strategy && (
                  <SummaryList title="Strategy" items={client.summary.strategy} />
                )}
                {client.summary.creative && (
                  <SummaryList title="Creative" items={client.summary.creative} />
                )}
                {client.summary.performance && (
                  <SummaryList title="Performance" items={client.summary.performance} />
                )}
              </div>
            )}

            {client.socials.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">Socials</h4>
                <ul className="mt-2 space-y-1">
                  {client.socials.map((social) => (
                    <li key={social.platform}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-foreground underline-offset-4 hover:underline"
                        data-analytics-event="portfolio.drawer.social"
                        data-analytics-value={social.platform}
                      >
                        {social.username}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function ArtifactCard({
  artifact,
  onTogglePlaylist,
  pinned,
  prefersReducedMotion,
}: {
  artifact: Artifact;
  onTogglePlaylist: () => void;
  pinned: boolean;
  prefersReducedMotion: boolean;
}) {
  const media = useMemo(() => {
    if (artifact.type === "video") {
      return (
        <VideoPreview
          src={artifact.src}
          title={artifact.title}
          prefersReducedMotion={prefersReducedMotion}
        />
      );
    }
    if (artifact.type === "poster" || artifact.type === "social") {
      return (
        <img
          src={artifact.src}
          alt={artifact.title}
          className="h-44 w-full rounded-xl border border-border object-cover"
          loading="lazy"
        />
      );
    }
    if (artifact.type === "web") {
      return (
        <img
          src={artifact.src}
          alt={artifact.title}
          className="h-36 w-full rounded-xl border border-border object-cover"
          loading="lazy"
        />
      );
    }
    return null;
  }, [artifact, prefersReducedMotion]);

  return (
    <article className="space-y-3 rounded-2xl border border-border bg-background/60 p-4">
      <header className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-base font-semibold text-foreground">{artifact.title}</h4>
          <p className="text-xs text-muted-foreground">
            {new Date(artifact.dateISO).toLocaleDateString()} • {artifact.outcomes.join(", ")}
          </p>
        </div>
        <button
          type="button"
          onClick={onTogglePlaylist}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            pinned
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
          }`}
          data-analytics-event="portfolio.drawer.playlist.toggle"
          data-analytics-value={artifact.id}
        >
          {pinned ? "Saved" : "Save"}
        </button>
      </header>
      <div className="overflow-hidden rounded-xl">{media}</div>
      <footer className="flex items-center justify-between text-xs text-muted-foreground">
        {artifact.durationSec ? <span>{Math.round(artifact.durationSec)}s</span> : <span>{artifact.type}</span>}
        {artifact.href && (
          <a
            href={artifact.href}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
            data-analytics-event="portfolio.drawer.artifact.open"
            data-analytics-value={artifact.id}
          >
            View
          </a>
        )}
      </footer>
    </article>
  );
}

function handleTabKeyboard(
  event: ReactKeyboardEvent<HTMLButtonElement>,
  tabId: TabId
) {
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  event.preventDefault();
  const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
  if (currentIndex === -1) return;
  const nextIndex =
    event.key === "ArrowRight"
      ? (currentIndex + 1) % tabs.length
      : (currentIndex - 1 + tabs.length) % tabs.length;
  const nextTab = tabs[nextIndex];
  if (!nextTab) return;
  const button = document.getElementById(`tab-${nextTab.id}`) as HTMLButtonElement | null;
  button?.focus();
  button?.click();
}

function VideoPreview({
  src,
  title,
  prefersReducedMotion,
}: {
  src: string;
  title: string;
  prefersReducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;
    const handleMouseEnter = () => {
      video.muted = true;
      void video.play();
    };
    const handleMouseLeave = () => {
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("mouseenter", handleMouseEnter);
    video.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      video.removeEventListener("mouseenter", handleMouseEnter);
      video.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <video
      ref={videoRef}
      src={src}
      className="h-56 w-full rounded-xl border border-border object-cover"
      preload="metadata"
      playsInline
      controls
      aria-label={title}
    />
  );
}

function SummaryList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h4>
      <ul className="mt-1 list-disc space-y-1 pl-4">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
