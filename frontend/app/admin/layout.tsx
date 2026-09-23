"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminGuard } from "@/lib/admin/useAdminGuard";
import { clearToken, API_URL } from "@/lib/admin/client";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/home", label: "Home" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/page-content", label: "Page Content" },
  { href: "/admin/lists", label: "Content Lists" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/opportunities", label: "Opportunities" },
  { href: "/admin/articles", label: "Insights / Articles" },
  { href: "/admin/jobs", label: "Job Openings" },
  { href: "/admin/images", label: "Images" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, username } = useAdminGuard();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
        Checking session…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-5">
          <p className="text-sm font-semibold text-slate-900">NEAW Admin</p>
          <p className="mt-1 text-xs text-slate-500">Signed in as {username}</p>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <a
            href={`${API_URL}/docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            API docs (/docs) ↗
          </a>
          <button
            onClick={() => {
              clearToken();
              router.replace("/admin/login");
            }}
            className="mt-1 block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
