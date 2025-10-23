import { redirect } from "next/navigation";

export const metadata = {
  title: "About — Michael F. Jones",
  description: "Learn more about Michael F. Jones, frontend-leaning full-stack developer.",
};

export default function AboutPage() {
  redirect("/#about");
}
