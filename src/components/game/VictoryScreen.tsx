import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Coins, Star, Award } from "lucide-react";

interface VictoryScreenProps {
  bossName: string;
  coinsEarned: number;
  xpEarned: number;
  badgeEarned?: string;
  onContinue: () => void;
}

export const VictoryScreen = ({
  bossName,
  coinsEarned,
  xpEarned,
  badgeEarned,
  onContinue
}: VictoryScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-game flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full p-8 space-y-8 bg-card border-2 border-gold shadow-glow">
        <div className="text-center space-y-4 victory-bounce">
          <Trophy className="h-24 w-24 text-gold mx-auto animate-pulse" />
          <h1 className="text-5xl font-bold text-foreground text-glow">
            VICTORY!
          </h1>
          <p className="text-2xl text-muted-foreground">
            You defeated {bossName}!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-victory p-6 rounded-xl text-center space-y-2">
            <Coins className="h-10 w-10 text-background mx-auto" />
            <p className="text-sm text-background/80 font-medium">Coins Earned</p>
            <p className="text-3xl font-bold text-background">+{coinsEarned}</p>
          </div>

          <div className="bg-primary/20 p-6 rounded-xl text-center space-y-2 border-2 border-primary">
            <Star className="h-10 w-10 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground font-medium">XP Gained</p>
            <p className="text-3xl font-bold text-foreground">+{xpEarned}</p>
          </div>
        </div>

        {badgeEarned && (
          <div className="bg-success/20 p-6 rounded-xl text-center space-y-2 border-2 border-success">
            <Award className="h-12 w-12 text-success mx-auto animate-pulse" />
            <p className="text-lg font-bold text-success">{badgeEarned}</p>
            <p className="text-sm text-muted-foreground">New Badge Unlocked!</p>
          </div>
        )}

        <Button
          onClick={onContinue}
          size="lg"
          className="w-full text-xl font-bold bg-gradient-victory hover:opacity-90"
        >
          Continue to Map
        </Button>
      </Card>
    </div>
  );
};
