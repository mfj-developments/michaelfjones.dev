"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, ArrowRight, Mail, Github, Linkedin, MapPin, Code2, Sparkles, GraduationCap, Activity } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectsClient from "@/app/projects/projects-client";
import ResumePreview from "@/components/resume-preview";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, hp }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    }
  };

  return (
    <div className="space-y-16">
      <section
        id="hero"
        className="relative overflow-hidden rounded-3xl border ring-1 ring-inset ring-[var(--border)] p-8 md:p-12 text-center md:text-left mask-gradient-b-40"
        style={{ background: "linear-gradient(135deg, var(--panel-gradient-start) 0%, var(--panel-gradient-end) 100%)" }}
      >
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
            <Link href="/#projects" className="group">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#contact">Contact Me</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/resume" className="inline-flex items-center gap-2">
              Resume <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
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

      <section id="projects" className="space-y-6 scroll-mt-28">
        <ProjectsClient projects={projects} />
      </section>

      <section id="about" className="space-y-8 scroll-mt-28">
        <div
          className="relative overflow-hidden rounded-2xl border p-6 ring-1 ring-inset ring-[var(--border)]"
          style={{ background: "linear-gradient(135deg, var(--panel-gradient-start) 0%, var(--panel-gradient-end) 100%)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle at center, var(--glow-primary) 0%, transparent 60%)" }}
          />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">About</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            I’m a frontend‑leaning full‑stack developer focused on building fast, accessible products with Next.js, TypeScript, Tailwind, and Supabase. I care about clean systems, thoughtful motion, and great developer experience.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary"><MapPin className="mr-1 h-3.5 w-3.5" /> Fayetteville, AR</Badge>
            <Badge variant="secondary"><Code2 className="mr-1 h-3.5 w-3.5" /> React · Next.js · TS</Badge>
            <Badge variant="secondary"><Sparkles className="mr-1 h-3.5 w-3.5" /> UI/UX & Accessibility</Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-background/40 p-5 ring-1 ring-inset ring-[var(--border)]">
            <div className="text-sm text-muted-foreground">Focus</div>
            <div className="mt-1 font-medium">Frontend‑first Full‑stack</div>
            <p className="mt-2 text-sm text-muted-foreground">React/Next.js, shadcn/ui, Tailwind, TypeScript. Server Components and clean data loading.</p>
          </div>
          <div className="rounded-2xl border bg-background/40 p-5 ring-1 ring-inset ring-[var(--border)]">
            <div className="text-sm text-muted-foreground">Tooling</div>
            <div className="mt-1 font-medium">Modern & pragmatic</div>
            <p className="mt-2 text-sm text-muted-foreground">Supabase, Vercel, ESLint/Prettier, GitHub Actions, Framer Motion, Plausible.</p>
          </div>
          <div className="rounded-2xl border bg-background/40 p-5 ring-1 ring-inset ring-[var(--border)]">
            <div className="text-sm text-muted-foreground">Education</div>
            <div className="mt-1 font-medium flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /> University of Arkansas</div>
            <p className="mt-2 text-sm text-muted-foreground">B.S. in Computer Science — hands-on with web apps, UI/UX, and applied AI workflows.</p>
          </div>
        </div>

        <ResumePreview />
      </section>

      <section id="contact" className="grid gap-6 lg:grid-cols-5 scroll-mt-28">
        <div
          className="lg:col-span-2 rounded-2xl border p-6 ring-1 ring-inset ring-[var(--border)]"
          style={{ background: "linear-gradient(135deg, var(--panel-gradient-start) 0%, var(--panel-gradient-end) 100%)" }}
        >
          <h2 className="text-2xl font-semibold tracking-tight">Let’s connect</h2>
          <p className="mt-2 text-sm text-muted-foreground">I respond within 1–2 business days. Prefer email? Use the direct link below.</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="mailto:mfjdevelopments@gmail.com" className="flex w-full items-center justify-center gap-2 rounded-xl border bg-background/40 px-4 py-2 text-sm ring-1 ring-inset ring-[var(--border)] transition-colors hover:bg-accent">
              <Mail className="h-4 w-4 text-primary" />
              <span>Email</span>
            </Link>
            <Link href="https://github.com/mj850-turbo" target="_blank" rel="noreferrer" className="flex w/full items-center justify-center gap-2 rounded-xl border bg-background/40 px-4 py-2 text-sm ring-1 ring-inset ring-[var(--border)] transition-colors hover:bg-accent">
              <Github className="h-4 w-4 text-primary" />
              <span>GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/michael-jones-58a03124b/" target="_blank" rel="noreferrer" className="flex w/full items-center justify-center gap-2 rounded-xl border bg-background/40 px-4 py-2 text-sm ring-1 ring-inset ring-[var(--border)] transition-colors hover:bg-accent">
              <Linkedin className="h-4 w-4 text-primary" />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-3 rounded-2xl border bg-background/40 p-6 ring-1 ring-inset ring-[var(--border)]">
          <h3 className="font-semibold mb-4">Send a message</h3>
          <form onSubmit={onSubmit} className="grid gap-4">
            <label className="sr-only" htmlFor="company">Company</label>
            <input id="company" name="company" autoComplete="off" tabIndex={-1} className="hidden" value={hp} onChange={(e) => setHp(e.target.value)} />
            <div className="grid gap-1">
              <label className="text-sm" htmlFor="name">Name</label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm" htmlFor="email">Email</label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm" htmlFor="message">Message</label>
              <Textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="How can I help?" />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send"}</Button>
              {status === "sent" && <span className="text-xs text-green-400">Message sent! I’ll reply soon.</span>}
              {status === "error" && <span className="text-xs text-red-400">{error}</span>}
            </div>
          </form>
        </div>
      </section>

      <section className="scroll-mt-28">
        <div
          className="relative overflow-hidden rounded-2xl border ring-1 ring-inset ring-[var(--border)] p-8"
          style={{ background: "linear-gradient(135deg, var(--cta-gradient-start) 0%, var(--cta-gradient-end) 100%)" }}
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-semibold tracking-tight">Let’s build something exceptional</h3>
            <p className="mt-2 text-muted-foreground">Have a project in mind or want feedback on an idea? I’m open to roles and collaborations in Northwest Arkansas and remote.</p>
            <div className="mt-4 flex gap-3">
              <Button asChild>
                <Link href="/#contact">Get in touch</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/#projects">See projects</Link>
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
