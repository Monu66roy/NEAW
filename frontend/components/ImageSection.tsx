import Image from "next/image";
import { ReactNode } from "react";

type ImageSectionProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  reverse?: boolean;
  visual?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
};

export default function ImageSection({
  eyebrow,
  title,
  children,
  reverse = false,
  visual,
  imageUrl,
  imageAlt = "",
}: ImageSectionProps) {
  return (
    <div
      className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="flex flex-col gap-4">
        {eyebrow && (
          <span className="text-sm font-semibold text-blue">
            {eyebrow}
          </span>
        )}

        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          {title}
        </h2>

        <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate sm:text-base">
          {children}
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-alt">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {visual}
          </div>
        )}
      </div>
    </div>
  );
}