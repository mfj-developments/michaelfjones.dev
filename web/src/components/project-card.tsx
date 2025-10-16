import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group relative overflow-hidden border-[color:var(--border)] bg-card/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[linear-gradient(var(--secondary),var(--accent))] before:opacity-0 group-hover:before:opacity-100">
      {/* Whole-card clickable overlay to details */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View details for ${project.title}`}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      />
      {/* Media */}
      <div className="px-6">
        <div
          className="relative overflow-hidden rounded-xl aspect-[16/9]"
          style={{ background: "linear-gradient(135deg, var(--panel-gradient-start) 0%, var(--panel-gradient-end) 100%)" }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
        </div>
      </div>

      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Badge key={s} variant="secondary">
              {s}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
