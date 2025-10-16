import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PageParams = { slug: string };
type PageProps = { params: Promise<PageParams> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Project`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border ring-1 ring-inset ring-[var(--border)]">
        <div className="relative h-56 sm:h-72 md:h-80">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
        </div>
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{project.title}</h1>
          <p className="mt-2 text-muted-foreground max-w-3xl">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            {project.links.live && (
              <Button asChild>
                <Link href={project.links.live} target="_blank" rel="noreferrer">
                  Live
                </Link>
              </Button>
            )}
            {project.links.repo && (
              <Button asChild variant="outline">
                <Link href={project.links.repo} target="_blank" rel="noreferrer">
                  GitHub
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border bg-muted/40 p-6 ring-1 ring-inset ring-[var(--border)]">
          <h2 className="font-semibold">Overview</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a placeholder detail page. Replace this section with a short case study: goal, approach,
            stack decisions, and outcomes. Include a few screenshots or an embedded demo as the project evolves.
          </p>
        </div>
        <div className="rounded-2xl border bg-background/40 p-6 ring-1 ring-inset ring-[var(--border)]">
          <h3 className="font-semibold">Tech Stack</h3>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {project.stack.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
