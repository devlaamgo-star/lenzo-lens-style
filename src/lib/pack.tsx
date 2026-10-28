import { metaTrack } from "./meta-pixel";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { packBreakdown, type PackBreakdown } from "./pricing";

type PackValue = {
  model: string;
  setModel: (m: string) => void;
  designs: string[];
  add: (id: string) => void;
  removeAt: (index: number) => void;
  removeOne: (id: string) => void;
  clear: () => void;
  countOf: (id: string) => number;
  isComplete: boolean;
  breakdown: PackBreakdown;
  ready: boolean;
};

const PackContext = createContext<PackValue | null>(null);
const KEY = "skinup-pack";

export function PackProvider({ children }: { children: ReactNode }) {
  const [model, setModelState] = useState("iPhone 17 Pro Max");
  const [designs, setDesigns] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { model?: string; designs?: string[] };
        if (typeof parsed.model === "string" && parsed.model) setModelState("iPhone 17 Pro Max");
        if (Array.isArray(parsed.designs)) setDesigns(parsed.designs.slice(0, 30));
      }
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(KEY, JSON.stringify({ model, designs }));
  }, [model, designs, ready]);

  const add = useCallback((id: string) => {
    let added = false;
    setDesigns((prev) => { if (prev.length >= 30) return prev; added = true; return [...prev, id]; });
    queueMicrotask(() => { if (added) metaTrack("AddToCart", { content_ids: [id], content_type: "product", contents: [{ id, quantity: 1 }], currency: "MAD" }); });
  }, []);

  const removeAt = useCallback((index: number) => {
    setDesigns((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeOne = useCallback((id: string) => {
    setDesigns((prev) => {
      const i = prev.lastIndexOf(id);
      return i === -1 ? prev : prev.filter((_, idx) => idx !== i);
    });
  }, []);

  const value = useMemo<PackValue>(
    () => ({
      model,
      setModel: setModelState,
      designs,
      add,
      removeAt,
      removeOne,
      clear: () => setDesigns([]),
      countOf: (id: string) => designs.filter((d) => d === id).length,
      isComplete: designs.length >= 3,
      breakdown: packBreakdown(designs.length),
      ready,
    }),
    [model, designs, add, removeAt, removeOne, ready],
  );

  return <PackContext.Provider value={value}>{children}</PackContext.Provider>;
}

export function usePack(): PackValue {
  const ctx = useContext(PackContext);
  if (!ctx) throw new Error("usePack must be used inside PackProvider");
  return ctx;
}
