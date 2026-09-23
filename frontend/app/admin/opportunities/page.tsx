"use client";

import ResourceManager from "@/components/admin/ResourceManager";

export default function AdminOpportunitiesPage() {
  return (
    <ResourceManager
      title="Opportunities"
      description="Shown as cards on the Opportunities page."
      endpoint="/opportunities"
      columns={["category", "title"]}
      fields={[
        { name: "category", label: "Category", type: "text", required: true },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "is_sample", label: "Sample content", type: "checkbox" },
        { name: "sort_order", label: "Sort order", type: "number" },
      ]}
      emptyItem={{
        category: "",
        title: "",
        description: "",
        is_sample: true,
        sort_order: 0,
      }}
    />
  );
}
