"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowRight, Code2, Activity, MapPin } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/project-card";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

export default function Home() {
  return (
    <div className="space-y-14">
      <section
        className="relative overflow-hidden rounded-3xl border ring-1 ring-inset ring-[var(--border)] p-8 md:p-12 text-center md:text-left mask-gradient-b-40"
        style={{ background: "linear-gradient(135deg, var(--panel-gradient-start) 0%, var(--panel-gradient-end) 100%)" }}
      >
        {/* grid pattern */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(246,250,253,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(246,250,253,.08)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle at center, var(--glow-primary) 0%, transparent 60%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 -bottom-28 h-[360px] w-[360px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle at center, var(--glow-secondary) 0%, transparent 60%)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ zIndex: -9 }}>
          <div
            className="h-[360px] w-[360px] sm:h-[420px] sm:w-[420px] md:h-[520px] md:w-[520px] opacity-25"
            style={{
              background: "linear-gradient(135deg, var(--text-gradient-start) 0%, var(--text-gradient-end) 100%)",
              WebkitMaskImage: "url('/mfj-logo-med-transp.svg')",
              maskImage: "url('/mfj-logo-med-transp.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              filter: "blur(6px)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            <Badge variant="secondary" className="bg-accent/40 text-foreground">Frontend‑focused</Badge>
            <Badge variant="secondary" className="bg-accent/40 text-foreground">Full‑stack</Badge>
            <Badge variant="secondary" className="bg-accent/40 text-foreground">Next.js · TypeScript · Supabase</Badge>
          </div>
        </motion.div>

        <motion.h1
          className="mt-4 fluid-heading font-semibold tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        >
          <Balancer>
            Michael F. Jones — <span className="text-gradient-accent">Developer</span>
          </Balancer>
        </motion.h1>
        <motion.p
          className="mt-4 text-muted-foreground max-w-2xl mx-auto md:mx-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <Balancer>
            I craft clean, accessible interfaces and production‑grade web apps. Strong foundation in React/Next, with an eye for detail and performance.
          </Balancer>
        </motion.p>
        <motion.div
          className="mt-7 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Button asChild className="shadow-[0_8px_24px_-8px_var(--shadow-primary)]">
            <Link href="/projects" className="group">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Me</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about#resume" className="inline-flex items-center gap-2">
              Resume <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Tech strip */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        >
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind",
            "shadcn/ui",
            "Supabase",
          ].map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <div className="rounded-xl border px-4 py-3 flex items-center gap-3 ring-1 ring-inset ring-[var(--border)]" style={{ background: "var(--badge-surface)" }}>
            <Code2 className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium">Production Projects</p>
              <p className="text-xs text-muted-foreground">3+ featured builds</p>
            </div>
          </div>
          <div className="rounded-xl border px-4 py-3 flex items-center gap-3 ring-1 ring-inset ring-[var(--border)]" style={{ background: "var(--badge-surface)" }}>
            <Activity className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium">Performance Targets</p>
              <p className="text-xs text-muted-foreground">Lighthouse ≥ 90 / 95 / 95 / 95</p>
            </div>
          </div>
          <div className="rounded-xl border px-4 py-3 flex items-center gap-3 ring-1 ring-inset ring-[var(--border)]" style={{ background: "var(--badge-surface)" }}>
            <MapPin className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium">Based in Fayetteville, AR</p>
              <p className="text-xs text-muted-foreground">Open to NWA & remote</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div
          className="relative overflow-hidden rounded-2xl border ring-1 ring-inset ring-[var(--border)] p-8"
          style={{ background: "linear-gradient(135deg, var(--cta-gradient-start) 0%, var(--cta-gradient-end) 100%)" }}
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-semibold tracking-tight">Let’s build something exceptional</h3>
            <p className="mt-2 text-muted-foreground">Have a project in mind or want feedback on an idea? I’m open to roles and collaborations in Northwest Arkansas and remote.</p>
            <div className="mt-4 flex gap-3">
              <Button asChild>
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects">See all projects</Link>
              </Button>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full opacity-20"
            aria-hidden
            style={{ background: "radial-gradient(circle at center, var(--glow-primary) 0%, transparent 60%)" }}
          />
        </div>
      </section>
    </div>
  );
}
