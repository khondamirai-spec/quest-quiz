import { Trophy, Medal, Award, Crown, Star, Flame, Coins, Sword } from "lucide-react";
import { motion } from "framer-motion";
import { LeaderboardEntry } from "@/types/game";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  className?: string;
  onClose?: () => void;
}

const getRankIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Crown className="w-6 h-6 text-yellow-400" />;
    case 1:
      return <Medal className="w-6 h-6 text-gray-300" />;
    case 2:
      return <Award className="w-6 h-6 text-amber-500" />;
    default:
      return <span className="text-lg font-bold text-white/80">#{index + 1}</span>;
  }
};

const getRankGlow = (index: number) => {
  switch (index) {
    case 0:
      return "shadow-yellow-500/50";
    case 1:
      return "shadow-gray-400/50";
    case 2:
      return "shadow-amber-500/50";
    default:
      return "shadow-blue-500/30";
  }
};

const getRankGradient = (index: number) => {
  switch (index) {
    case 0:
      return "from-yellow-500/20 via-yellow-400/10 to-transparent";
    case 1:
      return "from-gray-400/20 via-gray-300/10 to-transparent";
    case 2:
      return "from-amber-500/20 via-amber-400/10 to-transparent";
    default:
      return "from-blue-500/20 via-blue-400/10 to-transparent";
  }
};

export const Leaderboard = ({ entries, className, onClose }: LeaderboardProps) => {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 ${className}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 193, 7, 0.2) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
        
        {/* Floating particles */}
        {typeof window !== 'undefined' && [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Close Button */}
          {onClose && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onClose}
              className="mb-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-sm border border-white/20"
            >
              <span className="text-white text-xl">×</span>
            </motion.button>
          )}

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <motion.div
              className="inline-block mb-4"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Trophy className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 mx-auto drop-shadow-2xl" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                style={{
                  background: "linear-gradient(to right, #fbbf24, #f59e0b, #d97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
              REYTING
            </h1>
            <p className="text-lg md:text-xl text-white/80">Eng yaxshi o'yinchilar</p>
          </motion.div>

          {/* Leaderboard Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-4"
          >
            {entries.length === 0 ? (
              <div className="text-center py-16">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Trophy className="w-20 h-20 text-white/30 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white/60 mb-2">Hali ballar yo'q</h3>
                <p className="text-white/50">Birinchi bo'lib raqobatlashing!</p>
              </div>
            ) : (
              entries.slice(0, 10).map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`
                    relative overflow-hidden rounded-2xl p-6
                    bg-gradient-to-r ${getRankGradient(index)}
                    border border-white/20 backdrop-blur-sm
                    shadow-2xl ${getRankGlow(index)}
                    hover:border-white/40 transition-all duration-300
                    ${index < 3 ? 'ring-2 ring-white/30' : ''}
                  `}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border-2 border-white/20">
                        {getRankIcon(index)}
                      </div>
                      
                      {/* Player Info */}
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                          {entry.playerName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-white/70">
                          <span className="flex items-center gap-1">
                            <Sword className="w-4 h-4" />
                            Level {entry.overallLevel}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4 text-orange-400" />
                            {entry.winRate}% g'alaba
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Score */}
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          {entry.totalCoins}
                        </span>
                      </div>
                      <p className="text-sm text-white/60">tanga</p>
                    </div>
                  </div>

                  {/* Special Effects for Top 3 */}
                  {index < 3 && (
                    <motion.div
                      className="absolute top-2 right-2"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Star className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
