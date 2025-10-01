import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface ComboIndicatorProps {
  combo: number;
  specialAttackReady: boolean;
}

export const ComboIndicator = ({ combo, specialAttackReady }: ComboIndicatorProps) => {
  if (combo === 0) return null;

  return (
    <div className={cn(
      "flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border-2 font-bold",
      specialAttackReady 
        ? "bg-gradient-victory border-gold text-background shadow-lg animate-pulse" 
        : "bg-warning/20 border-warning text-warning"
    )}>
      <Flame className={cn("h-4 w-4 md:h-5 md:w-5", specialAttackReady && "animate-bounce")} />
      <span className="text-sm md:text-base lg:text-lg">
        {combo} COMBO!
      </span>
      {specialAttackReady && (
        <span className="text-xs md:text-sm ml-1 text-glow hidden sm:inline">FUSION READY!</span>
      )}
    </div>
  );
};
