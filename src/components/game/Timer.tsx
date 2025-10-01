import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerProps {
  seconds: number;
  maxSeconds: number;
}

export const Timer = ({ seconds, maxSeconds }: TimerProps) => {
  const isWarning = seconds <= 5;
  const percentage = (seconds / maxSeconds) * 100;
  
  return (
    <div className="flex items-center gap-2">
      <Clock className={cn(
        "h-6 w-6",
        isWarning ? "text-warning animate-pulse" : "text-foreground"
      )} />
      <div className="relative w-32 h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-linear rounded-full",
            isWarning ? "bg-warning" : "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={cn(
        "text-xl font-bold tabular-nums min-w-[3ch]",
        isWarning && "text-warning animate-pulse text-glow"
      )}>
        {seconds}s
      </span>
    </div>
  );
};
