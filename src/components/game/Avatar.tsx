import { cn } from "@/lib/utils";
import { Shield, Zap } from "lucide-react";

interface AvatarProps {
  type: "player" | "boss";
  name: string;
  level?: number;
  isAttacking?: boolean;
  isHurt?: boolean;
  hasShield?: boolean;
  inRageMode?: boolean;
}

export const Avatar = ({ 
  type, 
  name, 
  level, 
  isAttacking, 
  isHurt,
  hasShield,
  inRageMode 
}: AvatarProps) => {
  return (
    <div className={cn(
      "relative flex flex-col items-center gap-2",
      isAttacking && "attack-animation",
      isHurt && "shake"
    )}>
      <div className={cn(
        "relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-xl md:rounded-2xl flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold transition-all",
        type === "player" ? "bg-gradient-player shadow-player" : "bg-gradient-boss shadow-boss",
        inRageMode && "pulse-glow"
      )}>
        {type === "player" ? "🛡️" : "👹"}
        {hasShield && (
          <Shield className="absolute -top-1 -right-1 md:-top-2 md:-right-2 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-player animate-pulse" />
        )}
        {inRageMode && (
          <Zap className="absolute -top-1 -right-1 md:-top-2 md:-right-2 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-warning animate-pulse" />
        )}
      </div>
      <div className="text-center">
        <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground">{name}</h3>
        {level && (
          <p className="text-xs md:text-sm text-muted-foreground">Level {level}</p>
        )}
      </div>
    </div>
  );
};
