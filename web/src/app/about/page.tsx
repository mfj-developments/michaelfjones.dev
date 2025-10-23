import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Code2, Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import ResumePreview from "@/components/resume-preview";

export const metadata = {
  title: "About — Michael F. Jones",
  description: "Frontend‑leaning full‑stack developer based in Fayetteville, AR.",
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Intro tile */}
      <section
        className="relative overflow-hidden rounded-2xl border p-6 ring-1 ring-inset ring-[var(--border)]"
        style={{ background: "linear-gradient(135deg, var(--panel-gradient-start) 0%, var(--panel-gradient-end) 100%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle at center, var(--glow-primary) 0%, transparent 60%)" }}
        />
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">About</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          I’m a frontend‑leaning full‑stack developer focused on building fast, accessible
          products with Next.js, TypeScript, Tailwind, and Supabase. I care about clean
          systems, thoughtful motion, and great developer experience.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">
            <MapPin className="mr-1 h-3.5 w-3.5" /> Fayetteville, AR
          </Badge>
          <Badge variant="secondary">
            <Code2 className="mr-1 h-3.5 w-3.5" /> React · Next.js · TS
          </Badge>
          <Badge variant="secondary">
            <Sparkles className="mr-1 h-3.5 w-3.5" /> UI/UX & Accessibility
          </Badge>
        </div>
        <div className="mt-5">
          <Button asChild>
            <Link href="/resume" className="group">
              View resume <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Quick facts grid */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-background/40 p-5 ring-1 ring-inset ring-[var(--border)]">
          <div className="text-sm text-muted-foreground">Focus</div>
          <div className="mt-1 font-medium">Frontend‑first Full‑stack</div>
          <p className="mt-2 text-sm text-muted-foreground">React/Next.js, shadcn/ui, Tailwind, TypeScript. Server Components and clean data loading.</p>
        </div>
        <div className="rounded-2xl border bg-background/40 p-5 ring-1 ring-inset ring-[var(--border)]">
          <div className="text-sm text-muted-foreground">Tooling</div>
          <div className="mt-1 font-medium">Modern & pragmatic</div>
          <p className="mt-2 text-sm text-muted-foreground">Supabase, Vercel, ESLint/Prettier, GitHub Actions, Framer Motion (light), Plausible.</p>
        </div>
        <div className="rounded-2xl border bg-background/40 p-5 ring-1 ring-inset ring-[var(--border)]">
          <div className="text-sm text-muted-foreground">Education</div>
          <div className="mt-1 font-medium flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /> University of Arkansas</div>
          <p className="mt-2 text-sm text-muted-foreground">B.S. in Computer Science — hands‑on with web apps, UI/UX, and applied AI workflows.</p>
        </div>
      </section>

      {/* Skills tiles */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-muted/40 p-5 ring-1 ring-inset ring-[var(--border)]">
          <h2 className="font-semibold">Core Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Supabase"].map((s) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-muted/40 p-5 ring-1 ring-inset ring-[var(--border)]">
          <h2 className="font-semibold">Principles</h2>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <li>• Accessibility and performance by default</li>
            <li>• Small, composable components</li>
            <li>• Clear structure, meaningful motion</li>
            <li>• Data‑driven pages with simple content flows</li>
          </ul>
        </div>
      </section>

      <ResumePreview />

      {/* CTA */}
      <section>
        <div
          className="relative overflow-hidden rounded-2xl border ring-1 ring-inset ring-[var(--border)] p-6"
          style={{ background: "linear-gradient(135deg, var(--cta-gradient-start) 0%, var(--cta-gradient-end) 100%)" }}
        >
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold tracking-tight">Let’s connect</h3>
            <p className="mt-1 text-sm text-muted-foreground">Open to roles and collaborations in Northwest Arkansas and remote. Happy to chat about ideas or code.</p>
            <div className="mt-4 flex gap-3">
              <Button asChild>
                <Link href="/contact">Contact</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects">Projects</Link>
              </Button>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full opacity-20"
            aria-hidden
            style={{ background: "radial-gradient(circle at center, var(--glow-primary) 0%, transparent 60%)" }}
          />
        </div>
      </section>
    </div>
  );
}
