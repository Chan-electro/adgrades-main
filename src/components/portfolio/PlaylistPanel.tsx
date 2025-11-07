import { useState } from "react";
import { usePlaylist } from "./PlaylistContext";

function formatDuration(seconds?: number) {
  if (!seconds) return null;
  const rounded = Math.round(seconds);
  if (rounded < 60) return `${rounded}s`;
  const minutes = Math.floor(rounded / 60);
  const remainder = rounded % 60;
  return remainder ? `${minutes}m ${remainder}s` : `${minutes}m`;
}

export function PlaylistPanel() {
  const { items, removeItem, clear } = usePlaylist();
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3"
      data-analytics-id="playlist"
    >
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Playlist ({items.length})
      </button>
      {expanded && (
        <div
          className="max-h-[60vh] w-80 overflow-hidden rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur"
          role="region"
          aria-label="Playlist"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Saved artifacts</h2>
            <button
              type="button"
              className="text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
              onClick={clear}
              disabled={items.length === 0}
            >
              Clear
            </button>
          </div>
          <ul className="mt-3 space-y-3 overflow-y-auto pr-1">
            {items.length === 0 && (
              <li className="text-sm text-muted-foreground">No artifacts pinned yet.</li>
            )}
            {items.map((item) => (
              <li key={`${item.clientId}-${item.id}`} className="rounded-xl border border-border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wide">{item.clientName}</p>
                    <p className="text-sm font-medium leading-snug">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(item.dateISO).toLocaleDateString()}</p>
                    {formatDuration(item.durationSec) && (
                      <p className="text-xs text-muted-foreground">{formatDuration(item.durationSec)}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id, item.clientId)}
                    className="rounded-md border border-border px-2 py-1 text-xs font-semibold transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label={`Remove ${item.title} from playlist`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
