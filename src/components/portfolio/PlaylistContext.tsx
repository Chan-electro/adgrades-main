import { createContext, useContext, useMemo, useState } from "react";
import type { Artifact } from "@/data/portfolioData";

type PlaylistItem = Artifact & {
  clientId: string;
  clientName: string;
};

type PlaylistContextValue = {
  items: PlaylistItem[];
  addItem: (item: PlaylistItem) => void;
  removeItem: (artifactId: string, clientId: string) => void;
  clear: () => void;
  isPinned: (artifactId: string, clientId: string) => boolean;
};

const PlaylistContext = createContext<PlaylistContextValue | undefined>(undefined);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PlaylistItem[]>([]);

  const value = useMemo<PlaylistContextValue>(
    () => ({
      items,
      addItem: (next) => {
        setItems((prev) => {
          const exists = prev.some((item) => item.id === next.id && item.clientId === next.clientId);
          if (exists) return prev;
          return [...prev, next];
        });
      },
      removeItem: (artifactId, clientId) => {
        setItems((prev) => prev.filter((item) => !(item.id === artifactId && item.clientId === clientId)));
      },
      clear: () => setItems([]),
      isPinned: (artifactId, clientId) =>
        items.some((item) => item.id === artifactId && item.clientId === clientId),
    }),
    [items]
  );

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
}

export type { PlaylistItem };
