"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot

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
    } catch (error: unknown) {
      setStatus("error");
      const message = error instanceof Error ? error.message : "Something went wrong";
      setError(message);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-5">
      {/* Left: intro / social */}
      <section
        className="md:col-span-2 rounded-2xl border p-6 ring-1 ring-inset ring-[var(--border)]"
        style={{ background: "linear-gradient(135deg, var(--panel-gradient-start) 0%, var(--panel-gradient-end) 100%)" }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">Let’s connect</h1>
        <p className="mt-2 text-sm text-muted-foreground">I respond within 1–2 business days. Prefer email? Use the direct link below.</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Link href="mailto:mfjdevelopments@gmail.com" className="flex items-center gap-2 rounded-lg border bg-background/40 px-3 py-2 ring-1 ring-inset ring-[var(--border)] hover:bg-accent transition-colors">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm">Email</span>
          </Link>
          <Link href="https://github.com/mj850-turbo" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border bg-background/40 px-3 py-2 ring-1 ring-inset ring-[var(--border)] hover:bg-accent transition-colors">
            <Github className="h-4 w-4 text-primary" />
            <span className="text-sm">GitHub</span>
          </Link>
          <Link href="https://www.linkedin.com/in/michael-jones-58a03124b/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border bg-background/40 px-3 py-2 ring-1 ring-inset ring-[var(--border)] hover:bg-accent transition-colors">
            <Linkedin className="h-4 w-4 text-primary" />
            <span className="text-sm">LinkedIn</span>
          </Link>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Direct email: <a className="underline" href="mailto:mfjdevelopments@gmail.com">mfjdevelopments@gmail.com</a></p>
      </section>

      {/* Right: form */}
      <section className="md:col-span-3 rounded-2xl border bg-background/40 p-6 ring-1 ring-inset ring-[var(--border)]">
        <h2 className="font-semibold mb-4">Send a message</h2>
        <form onSubmit={onSubmit} className="grid gap-4">
          {/* honeypot */}
          <label className="sr-only" htmlFor="company">Company</label>
          <input id="company" name="company" autoComplete="off" tabIndex={-1} className="hidden" value={hp} onChange={(e)=>setHp(e.target.value)} />
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
      </section>
    </div>
  );
}
