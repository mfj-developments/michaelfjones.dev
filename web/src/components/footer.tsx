import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-8 text-sm bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Michael F. Jones — Fayetteville, AR</p>
        <div className="flex gap-4">
          <Link href="mailto:mfjdevelopments@gmail.com" className="hover:underline">Email</Link>
          <Link href="https://github.com/mj850-turbo" target="_blank" rel="noreferrer" className="hover:underline">GitHub</Link>
          <Link href="https://www.linkedin.com/in/michael-jones-58a03124b/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}
