import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { LeaderboardEntry } from "@/types/game";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  className?: string;
}

const getRankIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Crown className="w-5 h-5 text-yellow-500" />;
    case 1:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 2:
      return <Award className="w-5 h-5 text-amber-600" />;
    default:
      return <span className="text-sm font-bold text-zinc-600">#{index + 1}</span>;
  }
};

const getRankBadgeVariant = (index: number) => {
  switch (index) {
    case 0:
      return "default" as const;
    case 1:
      return "secondary" as const;
    case 2:
      return "outline" as const;
    default:
      return "outline" as const;
  }
};

export const Leaderboard = ({ entries, className }: LeaderboardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Reyting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.length === 0 ? (
          <div className="text-center py-8 text-zinc-500">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Hali ballar yo'q. Birinchi bo'lib raqobatlashing!</p>
          </div>
        ) : (
          entries.slice(0, 5).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(index)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-zinc-800 dark:text-white">
                    {entry.playerName}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Boss Bosqichi {entry.highestBoss}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={getRankBadgeVariant(index)} className="text-xs">
                  {entry.totalCoins} tanga
                </Badge>
                {entry.winStreak > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {entry.winStreak} ketma-ket
                  </Badge>
                )}
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
