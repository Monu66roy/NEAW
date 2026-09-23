"use client";

import Link from "next/link";
import { NAV_LINKS , MAIN_NAV_LINKS } from "@/lib/site";

type MobileMenuProps = {
  open: boolean;
  onNavigate: () => void;
};

export default function MobileMenu({
  open,
  onNavigate,
}: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink/50 backdrop-blur-[3px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onNavigate}
        aria-hidden="true"
      />

      {/* Side Drawer */}
      <aside
        id="mobile-menu"
        className={`fixed right-0 top-0 z-50 h-dvh w-[50vw] min-w-[300px] max-w-[460px] overflow-hidden bg-surface shadow-[-20px_0_50px_rgba(15,42,58,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-19 items-center justify-between border-b border-line px-7">
          <div>
            <h2 className="mt-1 font-display text-xl font-bold text-ink">
              Menu
            </h2>
          </div>

          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-all duration-300 hover:border-blue hover:bg-blue-pale hover:text-blue active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Mobile"
          className="flex h-[calc(100dvh-6rem)] flex-col overflow-y-auto px-7 py-7"
        >
          <div className="flex flex-col">
            {MAIN_NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className={`group flex items-center justify-between border-b border-line/70 py-4 text-[15px] font-semibold text-ink transition-all duration-500 ease-out hover:text-blue ${
                  open
                    ? "translate-x-0 opacity-100"
                    : "translate-x-5 opacity-0"
                }`}
                style={{
                  transitionDelay: open
                    ? `${80 + index * 30}ms`
                    : "0ms",
                }}
              >
                <span>{link.label}</span>

                <span className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div
            className={`mt-auto pt-8 transition-all duration-500 ${
              open
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: open
                ? `${100 + MAIN_NAV_LINKS.length * 30}ms`
                : "0ms",
            }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-light">
              Start a conversation
            </p>

            <Link
              href="/contact"
              onClick={onNavigate}
              className="flex min-h-12 items-center justify-center rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-deep hover:shadow-md active:scale-[0.98]"
            >
              Get in touch
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}