"use client";

import Badge from "@/components/Badge";
import { resolveImageUrl } from "@/lib/media";
import { useRouter } from "next/navigation";

export type Project = {
  slug: string;
  title: string;
  location: string;
  sector: string;
  status: "Concept" | "Development" | "Under Construction" | "Operational";
  description: string;
  image_url?: string | null;
};

const statusTone: Record<Project["status"], "blue" | "green" | "neutral"> = {
  Concept: "neutral",
  Development: "blue",
  "Under Construction": "blue",
  Operational: "green",
};

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  return (
  <article className="flex rounded-[3px] flex-col overflow-hidden border border-line bg-white transition-all duration-500 ease-out hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_12px_30px_rgba(15,42,58,0.10)]">
  <div className="relative flex h-40 items-center justify-center bg-surface-alt">
    {project.image_url ? (
      <img
        src={resolveImageUrl(project.image_url)}
        alt={project.title}
        className="h-full w-full object-cover"
      />
    ) : (
      <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
        <polyline
          points="0,80 40,55 70,68 110,30 150,45 200,20"
          fill="none"
          stroke="var(--blue)"
          strokeWidth="2"
          opacity="0.5"
        />
        <polyline points="0,95 200,95" stroke="var(--green)" strokeWidth="3" opacity="0.6" />
      </svg>
    )}

    <span className="absolute left-4 top-4">
      <Badge tone={statusTone[project.status]}>{project.status}</Badge>
    </span>
  </div>

  <div className="flex flex-1 flex-col gap-3 p-6">
    <div>
      <h3 className="text-lg font-semibold text-ink">{project.title}</h3>

      <p className="mt-1 text-sm text-slate-light">
        {project.location} &middot; {project.sector}
      </p>
    </div>

    <p className="flex-1 text-sm leading-relaxed text-slate">
      {project.description}
    </p>

    <button
      type="button"
      onClick={() => router.push(`/projects/${project.slug}`)}
      className="mt-1 self-start text-sm font-semibold text-blue transition-colors hover:text-blue-deep"
    >
      View details
    </button>
  </div>
</article>
  );
}
