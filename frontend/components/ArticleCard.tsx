import Badge from "@/components/Badge";
import { resolveImageUrl } from "@/lib/media";


export type Article = {
  category: string;
  title: string;
  date: string;
  description: string;
  image_url?: string | null;
};

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col overflow-hidden border border-line bg-white">
      <div className="flex h-36 items-center justify-center bg-blue-pale">
        {article.image_url ? (
          <img
            src={resolveImageUrl(article.image_url)}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 100 60"
            className="h-14 w-24"
            aria-hidden="true"
          >
            <path
              d="M5 45 C20 20, 35 40, 50 15 S 80 5, 95 25"
              fill="none"
              stroke="var(--blue)"
              strokeWidth="2.5"
            />
          </svg>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3">
          <Badge tone="blue">{article.category}</Badge>
          <span className="text-xs text-slate-light">{article.date}</span>
        </div>

        <h3 className="text-lg font-semibold leading-snug text-ink">
          {article.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-slate">
          {article.description}
        </p>

        <button
          type="button"
          className="mt-1 self-start text-sm font-semibold text-blue transition-colors hover:text-blue-deep"
        >
          Read more
        </button>
      </div>
    </article>
  );
}