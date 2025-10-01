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
      "relative flex flex-col items-center gap-3",
      isAttacking && "attack-animation",
      isHurt && "shake"
    )}>
      <div className={cn(
        "relative w-40 h-40 rounded-2xl flex items-center justify-center text-6xl font-bold transition-all",
        type === "player" ? "bg-gradient-player shadow-player" : "bg-gradient-boss shadow-boss",
        inRageMode && "pulse-glow"
      )}>
        {type === "player" ? "🛡️" : "👹"}
        {hasShield && (
          <Shield className="absolute -top-2 -right-2 h-10 w-10 text-player animate-pulse" />
        )}
        {inRageMode && (
          <Zap className="absolute -top-2 -right-2 h-10 w-10 text-warning animate-pulse" />
        )}
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground">{name}</h3>
        {level && (
          <p className="text-sm text-muted-foreground">Level {level}</p>
        )}
      </div>
    </div>
  );
};
