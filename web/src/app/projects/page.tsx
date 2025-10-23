import { redirect } from "next/navigation";

export const metadata = {
  title: "Projects — Michael F. Jones",
  description: "Selected work by Michael F. Jones.",
};

export default function ProjectsPage() {
  redirect("/#projects");
}
