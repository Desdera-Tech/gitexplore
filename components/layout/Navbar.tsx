"use client";

import { APP_NAME } from "@/constants/env";
import { NAVIGATION_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="relative bg-card border-b px-6 md:px-10 flex justify-center">
      <div className="flex flex-1 items-center justify-between md:justify-start max-w-7xl h-16 gap-8">
        {/* Logo */}
        <a href="/" className="font-bold text-xl text-primary z-50">
          {APP_NAME}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {NAVIGATION_LINKS.map((link, index) => {
            const isActive =
              (link.href === pathname && link.href === "/") ||
              (pathname.includes(link.href) && link.href !== "/") ||
              link.subpages.includes(pathname);

            return (
              <Link
                href={link.href}
                key={index}
                className={cn(
                  "font-medium text-sm text-muted-foreground hover:font-bold hover:text-primary transition-all",
                  isActive ? "font-bold text-primary" : "",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Theme Switcher */}
        <div className="hidden md:flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
        </div>

        {/* Mobile Controls (Theme + Hamburger) */}
        <div className="flex items-center gap-2 md:hidden z-50">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-primary cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-muted-foreground hover:text-primary focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={cn(
            "absolute top-16 left-0 w-full bg-card border-y px-6 py-4 flex flex-col gap-4 transition-all duration-300 md:hidden z-40",
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2",
          )}
        >
          {NAVIGATION_LINKS.map((link, index) => {
            const isActive =
              (link.href === pathname && link.href === "/") ||
              (pathname.includes(link.href) && link.href !== "/") ||
              link.subpages.includes(pathname);

            return (
              <Link
                href={link.href}
                key={index}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "font-medium text-sm text-muted-foreground hover:font-bold hover:text-primary py-2 border-b last:border-none border-border",
                  isActive ? "font-bold text-primary" : "",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
