"use client";

import ResourceManager from "@/components/admin/ResourceManager";

export default function AdminArticlesPage() {
  return (
    <ResourceManager
      title="Insights / Articles"
      description="All articles appear on the Insights page. Use 'Show on Home' to select which articles appear on the Home page."
      endpoint="/articles"
      columns={[
        "title",
        "category",
        "article_date",
        "featured",
        "show_on_home",
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },

        {
          name: "slug",
          label: "Slug (used in the URL)",
          type: "text",
          required: true,
        },

        { name: "category", label: "Category", type: "text" },

        { name: "article_date", label: "Date", type: "text" },

        {
          name: "description",
          label: "Summary",
          type: "textarea",
        },

        {
          name: "image",
          label: "Image",
          type: "image",
        },

        {
          name: "featured",
          label: "Featured on Insights page",
          type: "checkbox",
        },

        {
          name: "show_on_home",
          label: "Show on Home",
          type: "checkbox",
        },

        {
          name: "is_sample",
          label: "Sample content",
          type: "checkbox",
        },

        {
          name: "sort_order",
          label: "Sort order",
          type: "number",
        },
      ]}
      emptyItem={{
        title: "",
        slug: "",
        category: "",
        article_date: "",
        description: "",
        image_id: null,
        image_url: null,
        featured: false,
        show_on_home: false,
        is_sample: true,
        sort_order: 0,
      }}
    />
  );
}