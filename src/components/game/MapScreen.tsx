import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Boss } from "@/types/game";
import { cn } from "@/lib/utils";
import { Lock, CheckCircle } from "lucide-react";

interface MapScreenProps {
  bosses: Boss[];
  currentBossId: number;
  defeatedBosses: number[];
  onSelectBoss: (boss: Boss) => void;
}

export const MapScreen = ({ 
  bosses, 
  currentBossId, 
  defeatedBosses,
  onSelectBoss 
}: MapScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-game p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-foreground text-glow">
            Boss Fight Arena
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your battle and conquer the bosses!
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bosses.map((boss, index) => {
            const isDefeated = defeatedBosses.includes(boss.id);
            const isUnlocked = boss.id <= currentBossId;
            const isLocked = !isUnlocked;

            return (
              <Card
                key={boss.id}
                className={cn(
                  "relative p-6 transition-all hover:scale-105",
                  "border-2",
                  isDefeated && "border-success bg-success/10",
                  isUnlocked && !isDefeated && "border-primary bg-card shadow-glow",
                  isLocked && "border-muted bg-muted/20 opacity-50"
                )}
              >
                {isDefeated && (
                  <CheckCircle className="absolute top-2 right-2 h-6 w-6 text-success" />
                )}
                {isLocked && (
                  <Lock className="absolute top-2 right-2 h-6 w-6 text-muted-foreground" />
                )}
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl mb-2">
                      {index === 0 && "🗿"}
                      {index === 1 && "👾"}
                      {index === 2 && "🏛️"}
                      {index === 3 && "🐉"}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {boss.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Level {boss.difficulty}
                    </p>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">HP:</span>
                      <span className="font-bold text-boss">{boss.maxHealth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Damage:</span>
                      <span className="font-bold text-destructive">{boss.damage}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onSelectBoss(boss)}
                    disabled={isLocked}
                    className={cn(
                      "w-full font-bold",
                      isDefeated && "bg-success hover:bg-success/90"
                    )}
                  >
                    {isDefeated ? "Rematch" : isUnlocked ? "Fight!" : "Locked"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" size="lg" className="border-2">
            View Leaderboard
          </Button>
          <Button variant="outline" size="lg" className="border-2">
            Shop
          </Button>
        </div>
      </div>
    </div>
  );
};
