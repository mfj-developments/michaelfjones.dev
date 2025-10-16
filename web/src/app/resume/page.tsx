import { redirect } from "next/navigation";

export const metadata = {
  title: "Resume — Michael Jones",
  description: "View or download my resume.",
};

export default function ResumePage() {
  redirect("/about#resume");
}

