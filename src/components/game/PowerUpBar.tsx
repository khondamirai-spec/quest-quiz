import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type PowerUpType = "heal" | "shield" | "timeFreeze" | "doubleDamage";

interface PowerUp {
  type: PowerUpType;
  count: number;
  icon: typeof Heart;
  label: string;
}

interface PowerUpBarProps {
  powerUps: Record<PowerUpType, number>;
  onUsePowerUp: (type: PowerUpType) => void;
  disabled?: boolean;
}

export const PowerUpBar = ({ powerUps, onUsePowerUp, disabled }: PowerUpBarProps) => {
  const powerUpsList: PowerUp[] = [
    { type: "heal", count: powerUps.heal, icon: Heart, label: "Heal" },
    { type: "shield", count: powerUps.shield, icon: Shield, label: "Shield" },
    { type: "timeFreeze", count: powerUps.timeFreeze, icon: Clock, label: "Freeze" },
    { type: "doubleDamage", count: powerUps.doubleDamage, icon: Zap, label: "2x DMG" },
  ];

  return (
    <div className="flex gap-1.5 md:gap-2">
      {powerUpsList.map(({ type, count, icon: Icon, label }) => (
        <Button
          key={type}
          onClick={() => onUsePowerUp(type)}
          disabled={disabled || count === 0}
          variant="outline"
          size="sm"
          className={cn(
            "relative border-2 border-primary/30 hover:border-primary hover:bg-primary/10 px-2 md:px-3",
            "transition-all hover:scale-105",
            count === 0 && "opacity-50 grayscale"
          )}
        >
          <Icon className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
          <span className="text-xs font-bold hidden md:inline">{label}</span>
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-gold text-background text-[10px] md:text-xs font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};
