import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ImageSection from "@/components/ImageSection";
import CTASection from "@/components/CTASection";
import TopoArt from "@/components/TopoArt";
import { getContentList, getPageContent, block } from "@/lib/api";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const [values, content] = await Promise.all([
    getContentList("core_values"),
    getPageContent("about"),
  ]);
  return (
    <>
      <section className="border-b border-line bg-blue-pale/40 py-16 sm:py-24">
        <div className="container-wide flex flex-col gap-4">
          <span className="text-sm font-semibold text-blue">About NEAW</span>
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink sm:text-5xl">
            {block(content, "hero_title", "[Company overview heading placeholder]")}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            {block(
              content,
              "hero_description",
              "[Placeholder — a short overview paragraph introducing Nepal Energy and Water Resources Pvt. Ltd. will be supplied and placed here.]"
            )}
          </p>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <ImageSection
          eyebrow="Company Introduction"
          title="[Company introduction heading placeholder]"
          visual={<TopoArt className="h-3/4 w-3/4" />}
        >
          <p>
            [Placeholder — company introduction copy describing NEAW&rsquo;s
            background and formation will be supplied.]
          </p>
          <p>
            [Placeholder — a second paragraph can continue the company
            introduction once final content is confirmed.]
          </p>
        </ImageSection>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <div className="container-wide grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4 border border-line p-8">
            <span className="text-sm font-semibold text-blue">Mission</span>
            <p className="text-base leading-relaxed text-slate">
              [Placeholder — the company&rsquo;s mission statement will be
              supplied and placed here.]
            </p>
          </div>
          <div className="flex flex-col gap-4 border border-line p-8">
            <span className="text-sm font-semibold text-green">Vision</span>
            <p className="text-base leading-relaxed text-slate">
              [Placeholder — the company&rsquo;s vision statement will be
              supplied and placed here.]
            </p>
          </div>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <div className="flex flex-col gap-10">
          <SectionHeading
            kicker="Core Focus"
            title="What guides our work"
            description="[Placeholder — a short description of NEAW's core focus and how it shapes decisions will be supplied.]"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.id} className="border border-line bg-white p-7">
                <h3 className="text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-24">
        <div className="container-wide">
          <ImageSection
            eyebrow="Approach"
            title="How we develop projects"
            reverse
            visual={<TopoArt className="h-3/4 w-3/4" />}
          >
            <p>
              [Placeholder — a description of NEAW&rsquo;s project development
              approach, from origination through execution, will be
              supplied.]
            </p>
          </ImageSection>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <ImageSection
          eyebrow="Partnership Approach"
          title="Working alongside the right partners"
          visual={<TopoArt className="h-3/4 w-3/4" />}
        >
          <p>
            [Placeholder — a description of how NEAW approaches strategic,
            project, and investment partnerships will be supplied.]
          </p>
        </ImageSection>
      </section>

      <CTASection
        title="Want to know more about NEAW?"
        description="Reach out and our team will be glad to share more about our work and plans."
        primaryCta={{ label: "Contact us", href: "/contact" }}
        secondaryCta={{ label: "See our projects", href: "/projects" }}
      />
    </>
  );
}
