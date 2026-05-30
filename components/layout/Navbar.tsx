"use client";

import { APP_NAME } from "@/constants/env";
import { NAVIGATION_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="relative bg-card border-b px-6 md:px-10 flex justify-center">
      <div className="flex flex-1 items-center justify-between md:justify-start max-w-7xl h-16 gap-8">
        {/* Logo */}
        <a href="/" className="font-bold text-xl z-50">
          {APP_NAME}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {NAVIGATION_LINKS.map((link, index) => (
            <a
              href={link.href}
              key={index}
              className={cn(
                "font-medium text-sm text-muted-foreground hover:font-bold hover:text-primary transition-all",
                link.href === pathname ? "font-bold text-primary" : "",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-primary focus:outline-none cursor-pointer z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Dropdown */}
        <div
          className={cn(
            "absolute top-16 left-0 w-full bg-card border-y px-6 py-4 flex flex-col gap-4 transition-all duration-300 md:hidden",
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2",
          )}
        >
          {NAVIGATION_LINKS.map((link, index) => (
            <a
              href={link.href}
              key={index}
              onClick={() => setIsOpen(false)}
              className={cn(
                "font-medium text-sm text-muted-foreground hover:font-bold hover:text-primary py-2 border-b last:border-none border-border",
                link.href === pathname ? "font-bold text-primary" : "",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
