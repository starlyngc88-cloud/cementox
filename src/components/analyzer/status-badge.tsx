import type { ColorToken } from "@shared/index";

const colorClasses: Record<ColorToken, string> = {
  success: "text-success border-success",
  warning: "text-warning border-warning",
  error: "text-error border-error",
  info: "text-info border-info",
  neutral: "text-neutral border-neutral",
};

const dotClasses: Record<ColorToken, string> = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
  neutral: "bg-neutral",
};

export function StatusBadge({ color, label }: { color: ColorToken; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm ${colorClasses[color]}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotClasses[color]}`} />
      {label}
    </span>
  );
}