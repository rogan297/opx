import { cn } from "@/utils/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  completed: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  stable: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  ready: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  in_progress: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  pending: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  draft: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  paused: "bg-muted text-muted-foreground border-border",
  inactive: "bg-muted text-muted-foreground border-border",
  error: "bg-red-500/15 text-red-500 border-red-500/30",
  failed: "bg-red-500/15 text-red-500 border-red-500/30",
  critical: "bg-red-500/15 text-red-500 border-red-500/30",
  alert: "bg-amber-500/15 text-amber-500 border-amber-500/30",
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase().replace(/\s+/g, "_");
  const colorClass = statusColors[normalized] || "bg-muted text-muted-foreground border-border";
  const label = status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium", colorClass, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
