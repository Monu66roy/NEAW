import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";
import { getSettings } from "@/lib/api";

const focusLinks = [
  { label: "Energy", href: "/what-we-do" },
  { label: "Water Resources", href: "/what-we-do" },
  { label: "Project Development", href: "/what-we-do" },
  { label: "Investment", href: "/what-we-do" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Projects", href: "/projects" },
];

export default async function Footer() {
  const COMPANY = await getSettings();
  return (
    <footer className="border-t border-line bg-white">
      {/* Main Footer */}
      <div className="container-wide grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
        
        {/* Company */}
        <div className="sm:col-span-2 lg:col-span-2">
           <Link href="/" className="inline-flex">
            <Image
              src="/brand/neaw-logo.png"
              alt="NEAW — Nepal Energy and Water Resources Pvt. Ltd."
              width={180}
              height={80}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate">
            <span className="font-semibold text-[17px] text-ink">
              {COMPANY.name}
            </span>
            <br />
            {COMPANY.tagline}.
          </p>
          {/* Social Links */}
          <div className="mt-6 flex gap-3">
            <a
              href={COMPANY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NEAW on LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-sm font-semibold text-slate transition-all duration-200 hover:border-blue hover:bg-blue-pale hover:text-blue"
            >
              in
            </a>

            <a
              href={COMPANY.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NEAW on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-sm font-semibold text-slate transition-all duration-200 hover:border-blue hover:bg-blue-pale hover:text-blue"
            >
              f
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-ink">
            Quick Links
          </h3>

          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate transition-colors duration-200 hover:text-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Focus Areas */}
        <div>
          <h3 className="text-sm font-semibold text-ink">
            Focus Areas
          </h3>

          <ul className="mt-5 flex flex-col gap-3">
            {focusLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-slate transition-colors duration-200 hover:text-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-ink">
            Contact
          </h3>

          <ul className="mt-5 flex flex-col gap-3 text-sm text-slate">
            <li>{COMPANY.location}</li>

            <li>
              <a
                href={`tel:${COMPANY.phone}`}
                className="transition-colors hover:text-blue"
              >
                {COMPANY.phone}
              </a>
            </li>

            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="break-all transition-colors hover:text-blue"
              >
                {COMPANY.email}
              </a>
            </li>

            <li>
              <a
                href={`https://${COMPANY.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue"
              >
                {COMPANY.website}
              </a>
            </li>
          </ul>

          {/* CTA */}
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-deep hover:shadow-md"
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-line">
        <div className="container-wide flex flex-col gap-4 py-6 text-xs text-slate-light sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights
            reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-blue"
            >
              Privacy Policy
            </Link>

            <Link
              href="/careers"
              className="transition-colors hover:text-blue"
            >
              Careers
            </Link>

            <Link
              href="/contact"
              className="transition-colors hover:text-blue"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}