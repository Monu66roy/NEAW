import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <section className="border-b border-line bg-blue-pale/40 py-16 sm:py-24">
        <div className="container-wide flex flex-col gap-4">
          <span className="text-sm font-semibold text-blue">Projects</span>

          <h1 className="max-w-2xl text-4xl font-extrabold text-ink sm:text-5xl">
            Creating value through projects across Nepal
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            We explore and support opportunities across Nepal's energy and
            water resources sectors. Our approach brings together local
            knowledge, technical capabilities, investment, and strong
            partnerships to help develop projects with long-term value.
          </p>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            Our project portfolio
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">
            Our portfolio spans different stages of project development,
            from early-stage concepts and feasibility work through development
            and implementation. Project information will be updated as
            individual opportunities progress.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <CTASection
        title="Have a project in mind?"
        description="Whether you are developing a new opportunity, looking for a project partner, or exploring investment opportunities in Nepal, we would be interested in hearing from you."
        primaryCta={{ label: "Contact us", href: "/contact" }}
        secondaryCta={{
          label: "Explore partnerships",
          href: "/partnerships",
        }}
      />
    </>
  );
}