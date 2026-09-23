import Image from "next/image";
import Button from "@/components/Button";

type HeroSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export default function HeroSection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[680px] overflow-hidden border-line">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/HeroImages.jpg"
          alt="Aerial view of Nepal's natural landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-deep/30 via-blue-deep/65 to-ink/80" />

      {/* Subtle Light Overlay */}
      <div className="absolute inset-0 bg-blue/10" />

      {/* Content */}
      <div className="container-wide relative z-10 flex min-h-[680px] items-center justify-center px-6 py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

          {/* Eyebrow */}
          {eyebrow && (
            <span className="mb-5 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              {eyebrow}
            </span>
          )}

          {/* Heading */}
          <h1 className="max-w-5xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
            {description}
          </p>

          {/* Buttons */}
          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {primaryCta && (
                <Button
                  href={primaryCta.href}
                  className="bg-blue/50 text-blue hover:bg-blue hover:border-white"
                >
                  {primaryCta.label}
                </Button>
              )}

              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant="ghost"
                  className="border-white/50 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white/20 hover:text-white"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}

          {/* Small supporting line */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.18em] text-white/60 sm:text-sm">
            <span>Energy</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span>Water Resources</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span>Sustainable Development</span>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <svg
        className="absolute bottom-0 left-0 z-10 block h-[120px] w-full text-surface"
        viewBox="0 0 1440 130"
        fill="currentColor"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path d="M0 55 C240 110 480 5 720 35 S1200 100 1440 30 V130 H0 Z" />
      </svg>
    </section>
  );
}