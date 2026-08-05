import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PACK_SIZE } from "./catalog";

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
  ready: boolean;
};

const PackContext = createContext<PackValue | null>(null);
const KEY = "lenzo-pack";

export function PackProvider({ children }: { children: ReactNode }) {
  const [model, setModelState] = useState("");
  const [designs, setDesigns] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { model?: string; designs?: string[] };
        if (typeof parsed.model === "string") setModelState(parsed.model);
        if (Array.isArray(parsed.designs)) setDesigns(parsed.designs.slice(0, PACK_SIZE));
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
    setDesigns((prev) => (prev.length >= PACK_SIZE ? prev : [...prev, id]));
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
      isComplete: designs.length === PACK_SIZE,
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
