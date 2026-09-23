import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "blue" | "green" | "neutral";
};

const tones = {
  blue: "bg-blue-pale text-blue-deep",
  green: "bg-green-pale text-green",
  neutral: "bg-surface-alt text-slate",
};

export default function Badge({ children, tone = "blue" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
