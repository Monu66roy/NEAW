import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import TopoArt from "@/components/TopoArt";
import { getArticles } from "@/lib/api";

export const metadata: Metadata = { title: "Insights" };

const categories = ["All", "Company News", "Energy", "Water Resources", "Industry"];

export default async function InsightsPage() {
  const allArticles = await getArticles();
const featured = allArticles.find((a) => a.featured) ?? null;
const articles = allArticles.filter((a) => a.id !== featured?.id);
  return (
    <>
      <section className="border-b border-line bg-blue-pale/40 py-16 sm:py-24">
        <div className="container-wide flex flex-col gap-4">
          <span className="text-sm font-semibold text-blue">Insights</span>
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink sm:text-5xl">
            News and perspectives from NEAW
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            [Placeholder — an introduction to NEAW's insights and news
            content will be supplied.]
          </p>
        </div>
      </section>

      <section className="container-wide py-16">
        <div className="grid grid-cols-1 items-center gap-8 border border-line bg-white p-8 lg:grid-cols-[1fr_1fr] lg:p-10">
          <div className="flex flex-col gap-4">
            <Badge tone="green">Featured</Badge>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              {featured?.title ?? "[Featured article headline placeholder]"}
            </h2>
            <p className="text-sm leading-relaxed text-slate sm:text-base">
              {featured?.description ??
                "[Placeholder — a short summary of the featured article will be supplied.]"}
            </p>
            <Button href="#" variant="ghost" className="self-start">
              Read more
            </Button>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-surface-alt">
            <TopoArt className="h-3/4 w-3/4" />
          </div>
        </div>
      </section>

      <section className="container-wide pb-16 sm:pb-24">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                index === 0
                  ? "border-blue bg-blue text-white"
                  : "border-line bg-white text-slate hover:border-blue hover:text-blue"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={{
              category: article.category,
              title: article.title,
              date: article.article_date,
              description: article.description,
              image_url: article.image_url,
            }}
          />
        ))}
        </div>
      </section>
    </>
  );
}
