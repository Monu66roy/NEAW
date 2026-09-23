import Link from "next/link";

const CARDS = [
  { href: "/admin/settings", title: "Settings", desc: "Company name, tagline, contact info, and social links." },
  { href: "/admin/page-content", title: "Page Content", desc: "Freeform text (and images) for hero sections and other blocks on any page." },
  { href: "/admin/lists", title: "Content Lists", desc: "Focus areas, values, partnership types, career reasons, privacy sections — and any new list you create." },
  { href: "/admin/projects", title: "Projects", desc: "Add, edit, or remove project cards shown on the Home and Projects pages." },
  { href: "/admin/opportunities", title: "Opportunities", desc: "Edit the opportunity categories on the Opportunities page." },
  { href: "/admin/articles", title: "Insights / Articles", desc: "Manage news and insight articles, including the featured one." },
  { href: "/admin/jobs", title: "Job Openings", desc: "Manage open roles shown on the Careers page." },
  { href: "/admin/images", title: "Images", desc: "Upload and manage images used across projects and articles." },
  { href: "/admin/home", title: "Home", desc: "Change and update your full home screen" },

];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Everything here is editable without touching code. For bulk edits or automation, the{" "}
        <span className="font-medium">API docs</span> link in the sidebar opens the same backend as an
        interactive, code-level interface.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:shadow-sm"
          >
            <h2 className="text-sm font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
