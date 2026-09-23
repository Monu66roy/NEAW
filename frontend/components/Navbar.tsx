"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileMenu from "@/components/MobileMenu";

const MAIN_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Projects", href: "/projects" },
  { label: "Partnerships", href: "/partnerships" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-white/95 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container-wide flex h-[76px] items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center"
          aria-label="NEAW home"
        >
          <Image
            src="/brand/NEAW-logobgremove-01.1.png"
            alt="NEAW — Nepal Energy and Water Resources Pvt. Ltd."
            width={180}
            height={80}
            className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1">
              {MAIN_NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`group relative inline-flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out ${
                        active
                          ? "text-blue-deep"
                          : "text-slate hover:text-ink"
                      }`}
                    >
                      {link.label}

                      {/* Smooth Active / Hover Underline */}
                      <span
                        className={`absolute bottom-1 left-4 right-4 h-[2px] origin-center rounded-full bg-blue transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          active
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-deep hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-blue hover:text-blue lg:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Close navigation" : "Open navigation"}
          </span>

          <div className="flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />

            <span
              className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu
        open={menuOpen}
        onNavigate={() => setMenuOpen(false)}
      />
    </header>
  );
}