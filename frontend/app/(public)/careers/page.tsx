import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ImageSection from "@/components/ImageSection";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import TopoArt from "@/components/TopoArt";
import { getContentList, getJobOpenings } from "@/lib/api";

export const metadata: Metadata = { title: "Careers" };

export default async function CareersPage() {
  const [reasons, jobs] = await Promise.all([
    getContentList("career_reasons"),
    getJobOpenings(),
  ]);
  const openRoles = jobs.filter((job) => job.is_open);
  return (
    <>
      <section className="border-b border-line bg-blue-pale/40 py-16 sm:py-24">
        <div className="container-wide flex flex-col gap-4">
          <span className="text-sm font-semibold text-blue">Careers</span>
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink sm:text-5xl">
            Join the team shaping Nepal&rsquo;s energy future
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            [Placeholder — an introduction to careers at NEAW will be
            supplied.]
          </p>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <ImageSection
          eyebrow="Why Work With Us"
          title="[Why work with NEAW heading placeholder]"
          visual={<TopoArt className="h-3/4 w-3/4" />}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            {reasons.map((reason) => (
              <div key={reason.id}>
                <h3 className="text-sm font-semibold text-ink">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-slate">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </ImageSection>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <div className="container-wide flex flex-col gap-10">
          <SectionHeading
            kicker="Current Opportunities"
            title="Open roles at NEAW"
            description="Recruitment details for each role will be added as they are finalised."
          />
          <div className="flex flex-col divide-y divide-line border border-line">
            {openRoles.map((role) => (
              <div
                key={role.id}
                className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-ink">{role.title}</h3>
                  <p className="mt-1 text-sm text-slate-light">
                    {role.location} &middot; {role.employment_type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone="blue">Open</Badge>
                  <Button href="/contact" variant="ghost">
                    View details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-20">
        <div className="flex flex-col items-start gap-6 border border-line bg-surface-alt p-10">
          <h2 className="max-w-lg text-2xl font-bold text-ink sm:text-3xl">
            Don&rsquo;t see the right role yet?
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate">
            Send us your CV and a short note about what you're looking for —
            we'll keep it on file for future openings.
          </p>
          <Button href="/contact">Send your application</Button>
        </div>
      </section>
    </>
  );
}
