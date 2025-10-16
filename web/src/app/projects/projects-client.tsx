"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types/project";
import ProjectCard from "@/components/project-card";
import { cn } from "@/lib/utils";

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("All");
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.stack.forEach((s) => set.add(s)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.stack.includes(filter));
  }, [filter, projects]);

  return (
    <div className="space-y-8">
      {/* Header tile */}
      <section className="rounded-2xl border bg-muted/40 p-6 ring-1 ring-inset ring-[var(--border)]">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Real, production‑oriented work with a focus on clean UI, performance, and
          maintainable code. Filter by stack to jump to what interests you.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => {
            const isActive = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs transition-colors ring-1 ring-inset ring-[var(--border)]",
                  isActive ? "text-foreground shadow-[0_8px_20px_-12px_var(--shadow-primary)]" : "bg-background/40 text-foreground/80 hover:bg-accent"
                )}
                style={
                  isActive
                    ? { background: "linear-gradient(135deg, var(--panel-gradient-start) 0%, var(--panel-gradient-end) 100%)" }
                    : undefined
                }
                aria-pressed={isActive}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
