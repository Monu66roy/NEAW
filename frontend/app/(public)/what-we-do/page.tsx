import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ImageSection from "@/components/ImageSection";
import CTASection from "@/components/CTASection";
import TopoArt from "@/components/TopoArt";
import { getContentList } from "@/lib/api";

export const metadata: Metadata = { title: "What We Do" };

export default async function WhatWeDoPage() {
  const FOCUS_AREAS = await getContentList("focus_areas");
  return (
    <>
      <section className="border-b border-line bg-blue-pale/40 py-16 sm:py-24">
        <div className="container-wide flex flex-col gap-4">
          <span className="text-sm font-semibold text-blue">What We Do</span>
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink sm:text-5xl">
            Working across energy, water, and project development
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            [Placeholder — an overview paragraph describing NEAW's main areas
            of work will be supplied.]
          </p>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FOCUS_AREAS.map((area, index) => (
            <ServiceCard
              key={area.id}
              index={index}
              title={area.title}
              description={area.description}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <div className="container-wide">
          <ImageSection
            eyebrow="Energy"
            title="[Energy focus heading placeholder]"
            visual={<TopoArt className="h-3/4 w-3/4" />}
          >
            <p>
              [Placeholder — details on NEAW&rsquo;s energy-sector activities
              will be supplied.]
            </p>
          </ImageSection>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <ImageSection
          eyebrow="Water Resources"
          title="[Water resources focus heading placeholder]"
          reverse
          visual={<TopoArt className="h-3/4 w-3/4" />}
        >
          <p>
            [Placeholder — details on NEAW&rsquo;s water-resources activities
            will be supplied.]
          </p>
        </ImageSection>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <div className="container-wide">
          <SectionHeading
            kicker="Project Development, Investment & Partnerships"
            title="From concept to completion"
            description="[Placeholder — a description of how NEAW structures project development, investment, and partnership arrangements will be supplied.]"
            align="center"
          />
        </div>
      </section>

      <CTASection
        title="Explore how we could work together"
        description="Get in touch to discuss a project, an investment, or a partnership opportunity."
        primaryCta={{ label: "Contact us", href: "/contact" }}
        secondaryCta={{ label: "View projects", href: "/projects" }}
      />
    </>
  );
}
