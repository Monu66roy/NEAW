type ServiceCardProps = {
  title: string;
  description: string;
  index: number;
};

export default function ServiceCard({
  title,
  description,
  index,
}: ServiceCardProps) {
  const accents = [
    "bg-blue",
    "bg-green",
    "bg-blue-deep",
    "bg-green-light",
    "bg-blue",
  ];

  return (
    <article className="flex rounded-[3px] flex-col gap-4 border border-line bg-white p-7 transition-colors duration-200 hover:border-blue">
      <span
        className={`h-2 w-10 rounded-full ${
          accents[index % accents.length]
        }`}
        aria-hidden="true"
      />

      <h3 className="text-xl font-semibold text-ink">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-slate">
        {description}
      </p>
    </article>
  );
}