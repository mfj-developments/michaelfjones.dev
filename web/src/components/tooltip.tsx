"use client";

import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type TooltipProps = PropsWithChildren<{
  label: string;
  className?: string;
}>;

export function Tooltip({ label, className, children }: TooltipProps) {
  return (
    <div className={cn("relative inline-flex group/tooltip", className)}>
      {children}
      <div
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover/95 px-2 py-1 text-xs text-muted-foreground shadow-lg opacity-0 transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100"
      >
        {label}
      </div>
    </div>
  );
}
