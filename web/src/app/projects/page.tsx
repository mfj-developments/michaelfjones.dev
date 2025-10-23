import { projects } from "@/data/projects";
import ProjectsClient from "./projects-client";

export const metadata = {
  title: "Projects — Michael F. Jones",
  description: "A selection of projects built with modern web tools.",
};

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} />;
}
