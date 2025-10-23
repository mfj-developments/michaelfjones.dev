"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme, ThemeProfile } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette } from "lucide-react";

const paletteOptions: { id: ThemeProfile; label: string; swatch: string[] }[] = [
  { id: "palette-default", label: "Default Blend", swatch: ["#8A83DA", "#FBD5BD", "#2B124C"] },
  { id: "palette-1", label: "Midnight Mauve", swatch: ["#174871", "#A77693", "#DED1C6"] },
  { id: "palette-2", label: "Neon Tides", swatch: ["#09CDCD", "#573894", "#002D72"] },
  { id: "palette-3", label: "Canyon Dawn", swatch: ["#8A83DA", "#FBD5BD", "#463699"] },
  { id: "palette-4", label: "Velvet Twilight", swatch: ["#854F6C", "#DFB6B2", "#2B124C"] },
  { id: "palette-5", label: "Royal Slate", swatch: ["#314B6E", "#607EA2", "#BDB3A3"] },
];

export default function ThemeControls({ withLabels = false }: { withLabels?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { mode, toggleMode, palette, setPalette } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentPalette = useMemo(
    () => paletteOptions.find((option) => option.id === palette) ?? paletteOptions[0],
    [palette]
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMode}
        aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
        className="h-9 w-9"
      >
        {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      <label className="sr-only" htmlFor="theme-palette-select">
        Select theme palette
      </label>
      <div className="relative">
        <select
          suppressHydrationWarning
          id="theme-palette-select"
          value={palette}
          onChange={(event) => setPalette(event.target.value as ThemeProfile)}
          className="appearance-none rounded-md border bg-background px-3 py-2 pr-8 text-sm shadow-sm ring-1 ring-inset ring-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          {paletteOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <Palette className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-1 rounded-md border border-border bg-background/80 px-2 py-1 shadow-sm">
        {currentPalette.swatch.map((color, idx) => (
          <span
            key={`${currentPalette.id}-${idx}`}
            aria-hidden
            className="h-3.5 w-3.5 rounded-sm border border-border"
            style={{ background: color }}
          />
        ))}
      </div>

      {withLabels && (
        <span className="text-xs text-muted-foreground hidden lg:inline-block" aria-hidden>
          {currentPalette.label}
        </span>
      )}
    </div>
  );
}
