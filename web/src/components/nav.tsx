"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ThemeControls from "@/components/theme-controls";
import LogoMark from "@/components/logo-mark";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/60 supports-[backdrop-filter]:bg-background/45 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3 text-foreground">
          <LogoMark className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <span className="font-semibold tracking-tight text-sm sm:text-base">Michael F. Jones</span>
        </Link>

        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <Link href={l.href} className="px-3 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden md:flex items-center gap-3 text-foreground/80">
          <Link aria-label="GitHub" href="https://github.com/mj850-turbo" target="_blank" rel="noreferrer">
            <Github className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
          <Link aria-label="LinkedIn" href="https://www.linkedin.com/in/michael-jones-58a03124b/" target="_blank" rel="noreferrer">
            <Linkedin className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
          <Link aria-label="Email" href="mailto:mfjdevelopments@gmail.com">
            <Mail className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
          <ThemeControls />
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" aria-label="Open menu">Menu</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-6">
                {links.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm">
                    {l.label}
                  </Link>
                ))}
                <div className="flex gap-3 pt-2">
                  <Link aria-label="GitHub" href="https://github.com/mj850-turbo" target="_blank" rel="noreferrer">
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link aria-label="LinkedIn" href="https://www.linkedin.com/in/michael-jones-58a03124b/" target="_blank" rel="noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link aria-label="Email" href="mailto:mfjdevelopments@gmail.com">
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
                <div className="pt-2">
                  <ThemeControls withLabels />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
