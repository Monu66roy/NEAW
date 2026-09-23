import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/api";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const COMPANY = await getSettings();
  return (
    <>
      <section className="border-b border-line bg-blue-pale/40 py-16 sm:py-24">
        <div className="container-wide flex flex-col gap-4">
          <span className="text-sm font-semibold text-blue">Contact</span>
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink sm:text-5xl">
            Let&rsquo;s start a conversation
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            Whether it's a project, a partnership, or a general enquiry, our
            team would like to hear from you.
          </p>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold text-ink">Location</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {COMPANY.location}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Phone</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                <a href={`tel:${COMPANY.phone}`} className="hover:text-blue">
                  {COMPANY.phone}
                </a>
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Email</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                <a href={`mailto:${COMPANY.email}`} className="hover:text-blue">
                  {COMPANY.email}
                </a>
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Website</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                <a
                  href={`https://${COMPANY.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue"
                >
                  {COMPANY.website}
                </a>
              </p>
            </div>
          </div>

          <div className="border border-line bg-white p-6 sm:p-10">
            <h2 className="text-xl font-semibold text-ink">Send an enquiry</h2>
            <p className="mt-2 text-sm text-slate">
              Fill in the form below and our team will get back to you.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
