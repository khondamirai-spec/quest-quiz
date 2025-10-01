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
    <div className="flex items-center gap-1.5 md:gap-2">
      <Clock className={cn(
        "h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 shrink-0",
        isWarning ? "text-warning animate-pulse" : "text-foreground"
      )} />
      <div className="relative w-20 md:w-28 lg:w-32 h-2 md:h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-linear rounded-full",
            isWarning ? "bg-warning" : "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={cn(
        "text-base md:text-lg lg:text-xl font-bold tabular-nums min-w-[2.5ch] md:min-w-[3ch]",
        isWarning && "text-warning animate-pulse text-glow"
      )}>
        {seconds}s
      </span>
    </div>
  );
};
