"use client";

import { FormEvent, useState } from "react";

const inputClasses =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-light focus-visible:border-blue";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // UI demo only — backend integration to be added in a later phase.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-line bg-green-pale p-8 text-center">
        <h3 className="text-lg font-semibold text-ink">Enquiry received</h3>
        <p className="mt-2 text-sm text-slate">
          This is a UI demo, so nothing has been sent yet. Once the backend is
          connected, submissions will reach the NEAW team directly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-semibold text-blue hover:text-blue-deep"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-sm font-medium text-ink">
          Full name
        </label>
        <input id="fullName" name="fullName" required className={inputClasses} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-ink">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={inputClasses} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="organisation" className="text-sm font-medium text-ink">
          Organisation
        </label>
        <input id="organisation" name="organisation" className={inputClasses} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="enquiryType" className="text-sm font-medium text-ink">
          Enquiry type
        </label>
        <select id="enquiryType" name="enquiryType" className={inputClasses} defaultValue="General">
          <option>General</option>
          <option>Partnership</option>
          <option>Investment</option>
          <option>Careers</option>
          <option>Media</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-ink">
          Subject
        </label>
        <input id="subject" name="subject" required className={inputClasses} />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClasses}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-blue px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-deep"
        >
          Submit enquiry
        </button>
      </div>
    </form>
  );
}
