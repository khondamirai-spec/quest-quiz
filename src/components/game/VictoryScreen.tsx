import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Coins, Star, Award, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-game flex items-center justify-center p-4 md:p-8">
      <Card className="max-w-2xl w-full p-6 md:p-8 space-y-6 md:space-y-8 bg-card border-2 border-gold shadow-glow">
        <div className="text-center space-y-3 md:space-y-4 victory-bounce">
          <Trophy className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-gold mx-auto animate-pulse" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-glow">
            G'ALABA!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
            Siz {bossName}ni mag'lub qildingiz!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-victory p-6 rounded-xl text-center space-y-2">
            <Coins className="h-10 w-10 text-background mx-auto" />
            <p className="text-sm text-background/80 font-medium">Olingan tangalar</p>
            <p className="text-3xl font-bold text-background">+{coinsEarned}</p>
          </div>

          <div className="bg-primary/20 p-6 rounded-xl text-center space-y-2 border-2 border-primary">
            <Star className="h-10 w-10 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground font-medium">Olingan XP</p>
            <p className="text-3xl font-bold text-foreground">+{xpEarned}</p>
          </div>
        </div>

        {badgeEarned && (
          <div className="bg-success/20 p-6 rounded-xl text-center space-y-2 border-2 border-success">
            <Award className="h-12 w-12 text-success mx-auto animate-pulse" />
            <p className="text-lg font-bold text-success">{badgeEarned}</p>
            <p className="text-sm text-muted-foreground">Yangi nishon ochildi!</p>
          </div>
        )}

        <Button
          onClick={onContinue}
          size="lg"
          className="w-full text-xl font-bold bg-gradient-victory hover:opacity-90"
        >
          <ArrowRight className="w-6 h-6 mr-2" />
          Keyingi level
        </Button>
      </Card>
    </div>
  );
};
