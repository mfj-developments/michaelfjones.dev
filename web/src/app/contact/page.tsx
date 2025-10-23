import { redirect } from "next/navigation";

export const metadata = {
  title: "Contact — Michael F. Jones",
  description: "Reach out to Michael F. Jones.",
};

export default function ContactPage() {
  redirect("/#contact");
}
