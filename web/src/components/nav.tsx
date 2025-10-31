"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, LogOut, Mail, User } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ThemeControls from "@/components/theme-controls";
import LogoMark from "@/components/logo-mark";
import { Tooltip } from "@/components/tooltip";
import { useAuth } from "@/contexts/auth-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type NavProps = {
  hasProjects?: boolean;
};

export default function Nav({ hasProjects = true }: NavProps) {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  const linkDefinitions = [
    { href: "/#about", label: "About", requiresProjects: false },
    { href: "/#projects", label: "Projects", requiresProjects: true },
    { href: "/#contact", label: "Contact", requiresProjects: false },
  ] as const;

  const activeLinks = linkDefinitions.filter((link) => (link.requiresProjects ? hasProjects : true));

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

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
              {activeLinks.map((l) => (
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
          <Tooltip label="GitHub">
            <Link aria-label="GitHub" href="https://github.com/mfj-developments" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </Link>
          </Tooltip>
          <Tooltip label="LinkedIn">
            <Link aria-label="LinkedIn" href="https://www.linkedin.com/in/michael-jones-58a03124b/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Tooltip>
          <Tooltip label="Email">
            <Link aria-label="Email" href="mailto:mfjdevelopments@gmail.com" className="hover:text-foreground transition-colors">
              <Mail className="h-5 w-5" />
            </Link>
          </Tooltip>
          <ThemeControls />

          <div className="h-5 w-px bg-border" />

          {!loading && (
            <>
              {user ? (
                <Dialog open={userMenuOpen} onOpenChange={setUserMenuOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      {user.user_metadata?.avatar_url ? (
                        <Image
                          src={user.user_metadata.avatar_url}
                          alt={user.user_metadata?.full_name || "User"}
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-full"
                        />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-sm">{user.user_metadata?.full_name || "Account"}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Account</DialogTitle>
                      <DialogDescription>
                        Signed in as {user.email}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 pt-4">
                      <Button onClick={handleSignOut} variant="outline" className="w-full gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button onClick={signInWithGoogle} size="sm" variant="default">
                  Sign In
                </Button>
              )}
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" aria-label="Open menu">Menu</Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs p-6 pt-16"
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              <div className="flex h-full flex-col gap-8">
                <nav className="flex flex-col gap-4">
                  {activeLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl border px-4 py-3 text-lg font-medium text-foreground/90 transition-colors hover:bg-accent/20"
                    >
                      {l.label}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-6">
                  {!loading && (
                    <div className="rounded-2xl border p-4">
                      {user ? (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            {user.user_metadata?.avatar_url ? (
                              <Image
                                src={user.user_metadata.avatar_url}
                                alt={user.user_metadata?.full_name || "User"}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                                <User className="h-5 w-5" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {user.user_metadata?.full_name || "Account"}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                          </div>
                          <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full gap-2">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={signInWithGoogle} className="w-full">
                          Sign In with Google
                        </Button>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between gap-3">
                    <Link aria-label="GitHub" href="https://github.com/mfj-developments" target="_blank" rel="noreferrer" className="flex h-12 flex-1 items-center justify-center rounded-xl border text-foreground/80 transition-colors hover:text-foreground">
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link aria-label="LinkedIn" href="https://www.linkedin.com/in/michael-jones-58a03124b/" target="_blank" rel="noreferrer" className="flex h-12 flex-1 items-center justify-center rounded-xl border text-foreground/80 transition-colors hover:text-foreground">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link aria-label="Email" href="mailto:mfjdevelopments@gmail.com" className="flex h-12 flex-1 items-center justify-center rounded-xl border text-foreground/80 transition-colors hover:text-foreground">
                      <Mail className="h-5 w-5" />
                    </Link>
                  </div>

                  <div className="rounded-2xl border px-4 py-5">
                    <ThemeControls withLabels />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
