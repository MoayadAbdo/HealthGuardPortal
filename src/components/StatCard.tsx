import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  urgent?: boolean;
  className?: string;
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  urgent,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/50 shadow-sm",
        urgent && "border-destructive/50",
        className
      )}
    >
      <CardContent className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          <div
            className={cn(
              "p-2 rounded-lg",
              urgent
                ? "bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary"
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground">{value}</div>
            {trend && (
              <div
                className={cn(
                  "text-xs font-medium mt-1",
                  trendUp ? "text-emerald-600" : "text-red-600"
                )}
              >
                {trend}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
