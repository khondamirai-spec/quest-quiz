import { cn } from "@/lib/utils";

interface HealthBarProps {
  current: number;
  max: number;
  type: "player" | "boss";
  className?: string;
}

export const HealthBar = ({ current, max, type, className }: HealthBarProps) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  const isLow = percentage < 30;
  
  return (
    <div className={cn("w-full space-y-1", className)}>
      <div className="flex justify-between text-sm font-bold">
        <span className={type === "player" ? "text-player" : "text-boss"}>HP</span>
        <span className="text-foreground">{current}/{max}</span>
      </div>
      <div className="relative h-6 bg-muted rounded-full overflow-hidden border-2 border-border">
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out",
            type === "player" ? "bg-gradient-player" : "bg-gradient-boss",
            isLow && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    </div>
  );
};
