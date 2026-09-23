"use client";

import ResourceManager from "@/components/admin/ResourceManager";

export default function AdminJobsPage() {
  return (
    <ResourceManager
      title="Job Openings"
      description="Shown on the Careers page."
      endpoint="/job-openings"
      columns={["title", "location", "employment_type", "is_open"]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug", type: "text", required: true },
        { name: "location", label: "Location", type: "text" },
        { name: "employment_type", label: "Employment type", type: "text" },
        { name: "summary", label: "Summary", type: "textarea" },
        { name: "is_open", label: "Currently open", type: "checkbox" },
        { name: "sort_order", label: "Sort order", type: "number" },
      ]}
      emptyItem={{
        title: "",
        slug: "",
        location: "",
        employment_type: "",
        summary: "",
        is_open: true,
        sort_order: 0,
      }}
    />
  );
}
