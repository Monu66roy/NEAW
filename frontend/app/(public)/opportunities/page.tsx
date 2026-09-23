import type { Metadata } from "next";
import OpportunityCard from "@/components/OpportunityCard";
import CTASection from "@/components/CTASection";
import { getOpportunities } from "@/lib/api";

export const metadata: Metadata = { title: "Opportunities" };

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();
  return (
    <>
      <section className="border-b border-line bg-blue-pale/40 py-16 sm:py-24">
        <div className="container-wide flex flex-col gap-4">
          <span className="text-sm font-semibold text-blue">Opportunities</span>
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink sm:text-5xl">
            Open doors for investors and partners
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            [Placeholder — an introduction to the kinds of opportunities NEAW
            plans to open up will be supplied.]
          </p>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-20">
        <div className="container-wide flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-surface-alt p-10 text-center">
          <h2 className="text-xl font-semibold text-ink">
            No specific opportunities are listed yet
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate">
            Check back soon, or get in touch directly — our team can discuss
            what's coming next.
          </p>
        </div>
      </section>

      <CTASection
        title="Interested in an opportunity?"
        description="Reach out and let us know what you're looking for — we'll follow up as opportunities become available."
        primaryCta={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
