import type { Metadata } from "next";
import { getContentList } from "@/lib/api";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPolicyPage() {
  const sections = await getContentList("privacy_sections");

  return (
    <section className="container-wide py-16 sm:py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        <span className="text-sm font-semibold text-blue">Legal</span>

        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="text-sm text-slate-light">
          Last updated: September 14, 2026
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-10">
        {sections.map((section) => (
          <div key={section.id}>
            <h2 className="text-xl font-semibold text-ink">
              {section.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
