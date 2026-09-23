import Link from "next/link";
import { getProject } from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";
import TopoArt from "@/components/TopoArt";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectPageProps) {
  const { id } = await params;

  const project = await getProject(id);

  if (!project) {
    return (
      <main className="min-h-[70vh] bg-surface">
        <section className="container-wide flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <span className="text-sm font-semibold text-blue">
            Project not found
          </span>

          <h1 className="mt-3 text-4xl font-bold text-ink">
            We couldn't find this project
          </h1>

          <p className="mt-4 max-w-lg text-slate">
            The project you are looking for may have been moved or is no
            longer available.
          </p>

          <Link
            href="/projects"
            className="mt-7 inline-flex items-center rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-deep hover:shadow-lg"
          >
            Back to Projects
          </Link>
        </section>
      </main>
    );
  }

  const imageSrc = resolveImageUrl(project.image_url);

  return (
    <main className="bg-surface">
      {/* Hero */}
      <section className="relative overflow-hidden bg-blue-deep">
        <div className="container-wide relative z-10 py-20 sm:py-24 lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              {project.status}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mt-5 text-base text-white/75 sm:text-lg">
              {project.location} · {project.sector}
            </p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="container-wide py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface-alt">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <TopoArt className="h-3/4 w-3/4" />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-semibold text-blue">
              Project Overview
            </span>

            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {project.title}
            </h2>

            <p className="mt-6 text-base leading-8 text-slate">
              {project.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-line bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-light">
                  Location
                </p>
                <p className="mt-2 font-semibold text-ink">
                  {project.location}
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-light">
                  Sector
                </p>
                <p className="mt-2 font-semibold text-ink">
                  {project.sector}
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-light">
                  Status
                </p>
                <p className="mt-2 font-semibold text-ink">
                  {project.status}
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-light">
                  Country
                </p>
                <p className="mt-2 font-semibold text-ink">
                  Nepal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Focus */}
      <section className="border-y border-line bg-white">
        <div className="container-wide py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold text-blue">
              Project Focus
            </span>

            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Responsible development and long-term value
            </h2>

            <p className="mt-5 text-base leading-8 text-slate">
              This project concept reflects NEAW's focus on exploring
              responsible opportunities that can contribute to Nepal's
              sustainable development while creating long-term value for
              communities, partners and stakeholders.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-lg font-bold text-ink">
                Sustainable Development
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate">
                Exploring opportunities with long-term environmental,
                economic and social considerations.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-lg font-bold text-ink">
                Responsible Approach
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate">
                Considering responsible development principles throughout the
                project lifecycle.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-lg font-bold text-ink">
                Long-Term Value
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate">
                Seeking opportunities that can create meaningful value for
                stakeholders and communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container-wide py-16 sm:py-20 lg:py-24">
        <div className="rounded-3xl bg-blue-deep px-6 py-12 text-center sm:px-10 sm:py-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Interested in this project?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            Get in touch with the NEAW team to discuss this project and
            potential opportunities for collaboration.
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
