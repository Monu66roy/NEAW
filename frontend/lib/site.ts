// Structural navigation — not editable content, so it stays in code.
// All editable business content (settings, projects, opportunities,
// articles, jobs, page text, and named lists like focus areas or values)
// lives in the database and is read through lib/api.ts.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Projects", href: "/projects" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const MAIN_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Projects", href: "/projects" },
  { label: "Partnerships", href: "/partnerships" },
] as const;
