"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Download, ExternalLink } from "lucide-react";

export default function ResumePreview() {
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const resume = {
    description: "Latest iteration prepared for frontend-focused roles.",
    path: "/Jones-Front-End-Web-Developer.pdf",
    downloadName: "Michael-F-Jones-Front-End-Web-Developer.pdf",
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#resume") {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setMaxHeight(0);
      return;
    }

    const measure = () => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        setMaxHeight(rect.height + 48);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, [open]);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleObjectLoad = () => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      setMaxHeight(rect.height + 48);
    }
  };

  useEffect(() => {
    if (!open || typeof window === "undefined") {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        setMaxHeight(rect.height + 48);
      }
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [open]);

  return (
    <section
      id="resume"
      className="relative overflow-hidden rounded-2xl border ring-1 ring-inset ring-[var(--border)] p-6 scroll-mt-36 sm:scroll-mt-40"
      style={{ background: "linear-gradient(135deg, var(--panel-gradient-start) 0%, var(--panel-gradient-end) 100%)" }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold tracking-tight">Resume</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View my latest experience snapshot or download the PDF for offline review.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          aria-expanded={open}
          className="self-end sm:self-auto"
        >
          {open ? (
            <span className="inline-flex items-center gap-2">Hide preview <ChevronUp className="h-4 w-4" /></span>
          ) : (
            <span className="inline-flex items-center gap-2">View preview <ChevronDown className="h-4 w-4" /></span>
          )}
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Currently showing</p>
          <p className="text-sm text-muted-foreground">{resume.description}</p>
        </div>
      </div>

      <div
        className={`transition-[max-height] duration-500 ease-out ${open ? "mt-4" : "max-h-0"}`}
        style={{ maxHeight: open ? maxHeight : 0 }}
      >
        <div
          ref={contentRef}
          className={`overflow-hidden rounded-xl border bg-background/70 transition-opacity duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          aria-hidden={!open}
        >
          <div className="w-full" style={{ aspectRatio: "8.5 / 11", maxHeight: "80vh", overflow: "hidden" }}>
            <object
              data={`${resume.path}#toolbar=0&navpanes=0&scrollbar=0`}
              type="application/pdf"
              className="h-full w-full"
              onLoad={handleObjectLoad}
            >
              <div className="flex flex-col items-start gap-2 p-6 text-sm text-muted-foreground">
                <p>Inline preview isn&apos;t available in this browser.</p>
                <a href={resume.path} className="underline" target="_blank" rel="noreferrer">
                  Download {resume.downloadName}
                </a>
              </div>
            </object>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button asChild>
          <a href={resume.path} download={resume.downloadName} className="inline-flex items-center gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={resume.path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
            <ExternalLink className="h-4 w-4" /> Open in new tab
          </a>
        </Button>
      </div>
    </section>
  );
}
