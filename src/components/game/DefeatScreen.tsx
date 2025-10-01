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
    <div className="min-h-screen bg-gradient-game flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full p-8 space-y-8 bg-card border-2 border-destructive">
        <div className="text-center space-y-4">
          <Skull className="h-24 w-24 text-destructive mx-auto animate-pulse" />
          <h1 className="text-5xl font-bold text-destructive text-glow">
            DEFEATED
          </h1>
          <p className="text-2xl text-muted-foreground">
            {bossName} was too powerful...
          </p>
          <p className="text-lg text-muted-foreground">
            You've been sent back to the beginning. Train harder and try again!
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onRetry}
            size="lg"
            variant="destructive"
            className="flex-1 text-xl font-bold"
          >
            Retry Boss
          </Button>
          <Button
            onClick={onBackToMap}
            size="lg"
            variant="outline"
            className="flex-1 text-xl font-bold border-2"
          >
            Back to Map
          </Button>
        </div>
      </Card>
    </div>
  );
};
