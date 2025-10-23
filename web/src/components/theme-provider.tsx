"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type ThemeMode = "light" | "dark";
export type ThemeProfile =
  | "palette-default"
  | "palette-1"
  | "palette-2"
  | "palette-3"
  | "palette-4"
  | "palette-5";

type ThemeContextValue = {
  mode: ThemeMode;
  palette: ThemeProfile;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setPalette: (palette: ThemeProfile) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const MODE_STORAGE_KEY = "mj-theme-mode";
const PALETTE_STORAGE_KEY = "mj-theme-palette";

const DEFAULT_MODE: ThemeMode = "dark";
const DEFAULT_PALETTE: ThemeProfile = "palette-default";

function loadStoredMode(): ThemeMode {
  if (typeof window === "undefined") return DEFAULT_MODE;
  const stored = window.localStorage.getItem(MODE_STORAGE_KEY) as ThemeMode | null;
  return stored === "light" || stored === "dark" ? stored : DEFAULT_MODE;
}

const paletteWhitelist: ThemeProfile[] = [
  "palette-default",
  "palette-1",
  "palette-2",
  "palette-3",
  "palette-4",
  "palette-5",
];

function loadStoredPalette(): ThemeProfile {
  if (typeof window === "undefined") return DEFAULT_PALETTE;
  const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY) as ThemeProfile | null;
  return stored && paletteWhitelist.includes(stored) ? stored : DEFAULT_PALETTE;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => loadStoredMode());
  const [palette, setPalette] = useState<ThemeProfile>(() => loadStoredPalette());
  const logoMarkupRef = useRef<string | null>(null);

  const updateDynamicFavicon = useCallback(() => {
    if (typeof document === "undefined") return;

    const baseMarkup = logoMarkupRef.current;
    if (!baseMarkup) return;

    const linkEl = document.head.querySelector<HTMLLinkElement>("link[data-theme-favicon]");
    if (!linkEl) return;

    const computed = getComputedStyle(document.documentElement);
    const mid = computed.getPropertyValue("--text-gradient-mid").trim();
    const start = computed.getPropertyValue("--text-gradient-start").trim();
    const end = computed.getPropertyValue("--text-gradient-end").trim();
    const primary = computed.getPropertyValue("--primary").trim();
    const fallback = mode === "dark" ? "#ffffff" : "#000000";
    const paletteColor = [mid, start, end, primary].find((value) => value.length > 0);
    const color = paletteColor || fallback;

    const svgWithColor = baseMarkup.replace("<svg", `<svg style="color:${color}"`);
    const encoded = `data:image/svg+xml,${encodeURIComponent(svgWithColor)}`;

    if (linkEl.href !== encoded) {
      linkEl.href = encoded;
    }
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = mode;
    root.classList.toggle("dark", mode === "dark");
    window.localStorage.setItem(MODE_STORAGE_KEY, mode);
    updateDynamicFavicon();
  }, [mode, updateDynamicFavicon]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = palette;
    window.localStorage.setItem(PALETTE_STORAGE_KEY, palette);
    updateDynamicFavicon();
  }, [palette, updateDynamicFavicon]);

  useEffect(() => {
    let cancelled = false;
    if (logoMarkupRef.current) return;

    fetch("/mfj-logo-big.svg")
      .then((response) => (response.ok ? response.text() : Promise.reject()))
      .then((text) => {
        if (cancelled) return;
        logoMarkupRef.current = text;
        updateDynamicFavicon();
      })
      .catch(() => {
        // Leave the static favicon in place if dynamic updates are unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, [updateDynamicFavicon]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      palette,
      setMode,
      toggleMode: () => setMode((prev) => (prev === "dark" ? "light" : "dark")),
      setPalette,
    }),
    [mode, palette]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
