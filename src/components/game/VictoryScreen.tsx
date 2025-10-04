'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Coins, Star, Award, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface VictoryScreenProps {
  bossName: string;
  coinsEarned: number;
  xpEarned: number;
  badgeEarned?: string;
  onContinue: () => void;
  onGiftCoins?: (coins: number) => void;
  isBoss?: boolean;
}

export const VictoryScreen = ({
  bossName,
  coinsEarned,
  xpEarned,
  badgeEarned,
  onContinue,
  onGiftCoins,
  isBoss = false
}: VictoryScreenProps) => {
  const [bonusCoinsClaimed, setBonusCoinsClaimed] = useState(false);

  const handleClaimBonusCoins = () => {
    setBonusCoinsClaimed(true);
    onGiftCoins?.(70);
    toast.success("+70 tanga olindi!");
  };
  return (
    <div className="min-h-screen bg-gradient-game flex items-center justify-center p-1 sm:p-2 md:p-4">
      <Card className="max-w-xs sm:max-w-sm md:max-w-md w-full p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 bg-card border-2 border-gold shadow-glow">
        <div className="text-center space-y-1 sm:space-y-2 md:space-y-3 victory-bounce">
          <Trophy className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-gold mx-auto animate-pulse" />
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground text-glow">
            G'ALABA!
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">
            Siz {bossName}ni mag'lub qildingiz!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <div className="bg-gradient-victory p-3 sm:p-4 rounded-xl text-center space-y-1">
            <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-background mx-auto" />
            <p className="text-xs text-background/80 font-medium">Olingan tangalar</p>
            <p className="text-lg sm:text-xl font-bold text-background">+{coinsEarned}</p>
          </div>

          <div className="bg-primary/20 p-3 sm:p-4 rounded-xl text-center space-y-1 border-2 border-primary">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto" />
            <p className="text-xs text-muted-foreground font-medium">Olingan XP</p>
            <p className="text-lg sm:text-xl font-bold text-foreground">+{xpEarned}</p>
          </div>
        </div>

        {badgeEarned && (
          <div className="bg-success/20 p-3 sm:p-4 rounded-xl text-center space-y-1 border-2 border-success">
            <Award className="h-8 w-8 sm:h-10 sm:w-10 text-success mx-auto animate-pulse" />
            <p className="text-sm sm:text-base font-bold text-success">{badgeEarned}</p>
            <p className="text-xs text-muted-foreground">Yangi nishon ochildi!</p>
          </div>
        )}

        <div className="space-y-1 sm:space-y-2">
          {/* Bonus Coins Button - only show for boss battles */}
          {isBoss && !bonusCoinsClaimed && (
            <Button
              onClick={handleClaimBonusCoins}
              size="sm"
              className="w-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg py-1"
            >
              <Coins className="w-3 h-3 mr-1" />
              +70 tanga olish!
            </Button>
          )}

          {/* Continue Button */}
          <Button
            onClick={onContinue}
            size="sm"
            className="w-full text-xs sm:text-sm font-bold bg-gradient-victory hover:opacity-90 py-1 sm:py-2"
          >
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Keyingi level
          </Button>
        </div>
      </Card>

    </div>
  );
};