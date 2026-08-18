import { cn } from "@/utils/utils";
import ForwardedIconComponent from "@/components/common/genericIconComponent";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: { value: number; direction: "up" | "down" };
  className?: string;
}

export default function StatsCard({ title, value, icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-4 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={cn("flex items-center gap-1 text-xs", trend.direction === "up" ? "text-emerald-500" : "text-red-500")}>
              <ForwardedIconComponent name={trend.direction === "up" ? "TrendingUp" : "TrendingDown"} className="h-3 w-3" />
              {Math.abs(trend.value)}% este mês
            </p>
          )}
        </div>
        <div className="rounded-md bg-muted p-2">
          <ForwardedIconComponent name={icon} className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
