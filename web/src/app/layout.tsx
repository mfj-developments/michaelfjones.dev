import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Michael Jones — Portfolio",
  description: "Frontend‑leaning full‑stack developer in Fayetteville, AR.",
  metadataBase: new URL("https://michaelfjones.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning data-mode="dark" data-theme="palette-1">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const root=document.documentElement;const storedMode=localStorage.getItem("mj-theme-mode");const storedPalette=localStorage.getItem("mj-theme-palette");const mode=storedMode==="light"?"light":"dark";root.dataset.mode=mode;root.classList.toggle("dark",mode==="dark");if(storedPalette){root.dataset.theme=storedPalette;}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`antialiased min-h-dvh flex flex-col bg-background text-foreground relative`}>
        <ThemeProvider>
          {/* Background layers: gradient + subtle noise */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10"
            style={{ background: "linear-gradient(to bottom, var(--gradient-top), var(--gradient-bottom))" }}
          />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10"
            style={{
              background:
                "radial-gradient(1000px 600px at 10% -10%, var(--gradient-radial-1) 0%, transparent 60%), radial-gradient(800px 400px at 90% -10%, var(--gradient-radial-2) 0%, transparent 55%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06] mix-blend-overlay bg-[url('/noise.svg')]"
          />

          <Nav />
          <main className="flex-1 container mx-auto px-4 py-10 sm:py-12">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
