import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skull, RotateCcw, Home } from "lucide-react";

interface DefeatScreenProps {
  bossName: string;
  onRetry: () => void;
  onBackToMap: () => void;
}

export const DefeatScreen = ({
  bossName,
  onRetry,
  onBackToMap
}: DefeatScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-game flex items-center justify-center p-4 md:p-8">
      <Card className="max-w-2xl w-full p-6 md:p-8 space-y-6 md:space-y-8 bg-card border-2 border-red-500 shadow-glow">
        <div className="text-center space-y-3 md:space-y-4">
          <Skull className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-red-500 mx-auto animate-pulse" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-glow">
            MAG'LUBIYAT!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
            {bossName} sizni mag'lub qildi!
          </p>
        </div>

        <div className="bg-red-500/20 p-6 rounded-xl text-center space-y-2 border-2 border-red-500">
          <p className="text-lg font-bold text-red-600">Yana urinib ko'ring!</p>
          <p className="text-sm text-muted-foreground">
            Qayta urinish uchun "Qayta urinish" tugmasini bosing
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onRetry}
            size="lg"
            className="w-full text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            Qayta urinish
          </Button>

          <Button
            onClick={onBackToMap}
            size="lg"
            variant="outline"
            className="w-full text-xl font-bold border-2"
          >
            <Home className="w-6 h-6 mr-2" />
            Xaritaga qaytish
          </Button>
        </div>
      </Card>
    </div>
  );
};