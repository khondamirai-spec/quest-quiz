import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skull } from "lucide-react";

interface DefeatScreenProps {
  bossName: string;
  onRetry: () => void;
  onBackToMap: () => void;
}

export const DefeatScreen = ({ bossName, onRetry, onBackToMap }: DefeatScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-game flex items-center justify-center p-4 md:p-8">
      <Card className="max-w-2xl w-full p-6 md:p-8 space-y-6 md:space-y-8 bg-card border-2 border-destructive">
        <div className="text-center space-y-3 md:space-y-4">
          <Skull className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-destructive mx-auto animate-pulse" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-destructive text-glow">
            DEFEATED
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
            {bossName} was too powerful...
          </p>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            You've been sent back to the beginning. Train harder and try again!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button
            onClick={onRetry}
            size="lg"
            variant="destructive"
            className="flex-1 text-lg md:text-xl font-bold"
          >
            Retry Boss
          </Button>
          <Button
            onClick={onBackToMap}
            size="lg"
            variant="outline"
            className="flex-1 text-lg md:text-xl font-bold border-2"
          >
            Back to Map
          </Button>
        </div>
      </Card>
    </div>
  );
};
