type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  return (
    <div
      className={`flex max-w-4xl flex-col gap-3 ${alignment} ${className}`}
    >
      {kicker && (
        <span className="text-sm font-semibold text-blue">
          {kicker}
        </span>
      )}

      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="max-w-3xl text-base leading-relaxed text-slate sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}