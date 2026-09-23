export type Opportunity = {
  category: string;
  title: string;
  description: string;
};

export default function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className="flex flex-col gap-3 border border-line bg-white p-7">
      <span className="text-xs font-semibold text-green">{opportunity.category}</span>
      <h3 className="text-lg font-semibold text-ink">{opportunity.title}</h3>
      <p className="text-sm leading-relaxed text-slate">{opportunity.description}</p>
    </article>
  );
}
