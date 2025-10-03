import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackgroundGlow } from "@/components/ui/background-components";
import { Level, Player } from "@/types/game";
import { cn } from "@/lib/utils";
import { Lock, CheckCircle, Trophy, Flame, Zap, BookOpen, Star, Swords, User, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Leaderboard } from "./Leaderboard";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

// Helper functions for icon animations
const getIconAnimation = (icon: string) => {
  switch (icon) {
    case "🧠": // Brain/Memory
      return {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      };
    case "🧬": // DNA
      return {
        scale: [1, 1.15, 1],
        rotate: [0, 8, -8, 0],
        y: [0, -3, 0]
      };
    case "🔬": // Microscope
      return {
        scale: [1, 1.1, 1],
        rotate: [0, 3, -3, 0]
      };
    case "📜": // Scroll
      return {
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0],
        y: [0, -2, 0]
      };
    case "🌍": // Earth
      return {
        scale: [1, 1.1, 1],
        rotate: [0, 10, -10, 0]
      };
    case "🗺️": // Map
      return {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        y: [0, -2, 0]
      };
    case "🎯": // Target
      return {
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0]
      };
    case "⚡": // Lightning
      return {
        scale: [1, 1.3, 1],
        rotate: [0, 15, -15, 0],
        y: [0, -5, 0]
      };
    case "🐛": // Bug
      return {
        scale: [1, 1.2, 1],
        rotate: [0, 12, -12, 0],
        y: [0, -4, 0]
      };
    case "✅❌": // True/False
      return {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      };
    case "🧪": // Test Tube
      return {
        scale: [1, 1.1, 1],
        rotate: [0, 3, -3, 0],
        y: [0, -2, 0]
      };
    case "🏛️": // Building
      return {
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0],
        y: [0, -1, 0]
      };
    case "🎓": // Graduation Cap
      return {
        scale: [1, 1.1, 1],
        rotate: [0, 4, -4, 0],
        y: [0, -3, 0]
      };
    case "🐉": // Dragon
      return {
        scale: [1, 1.15, 1],
        rotate: [0, 8, -8, 0],
        y: [0, -3, 0]
      };
    case "🐲": // Dragon 2
      return {
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        y: [0, -4, 0]
      };
    case "🔥": // Fire
      return {
        scale: [1, 1.25, 1],
        rotate: [0, 8, -8, 0],
        y: [0, -6, 0]
      };
    case "👹": // Mutant Monster
      return {
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        y: [0, -5, 0]
      };
    case "👑🐉": // Crown Dragon
      return {
        scale: [1, 1.1, 1],
        rotate: [0, 6, -6, 0],
        y: [0, -2, 0]
      };
    default:
      return {
        scale: [1, 1.05, 1],
        rotate: [0, 3, -3, 0]
      };
  }
};

const getIconTransition = (icon: string) => {
  switch (icon) {
    case "⚡": // Lightning - fast
      return {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
    case "🔥": // Fire - fast
      return {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
    case "🐛": // Bug - bouncy
      return {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
    case "🧬": // DNA - smooth
      return {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
    case "🌍": // Earth - slow rotation
      return {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
    case "🗺️": // Map - medium
      return {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
    case "🧪": // Test Tube - gentle
      return {
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
    case "🏛️": // Building - stable
      return {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
    case "🎓": // Graduation Cap - celebratory
      return {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
    default:
      return {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      };
  }
};

interface MapScreenProps {
  levels: Level[];
  currentLevelId: number;
  completedLevels: number[];
  onSelectLevel: (level: Level) => void;
  player?: Player;
  onHome?: () => void;
  subject?: string;
}

export const MapScreen = ({ 
  levels, 
  currentLevelId, 
  completedLevels,
  onSelectLevel,
  player,
  onHome,
  subject
}: MapScreenProps) => {
  const totalLevels = levels.length;
  const completedCount = completedLevels.length;
  const progressPercentage = (completedCount / totalLevels) * 100;
  
  // Calculate streak (for demo purposes)
  const streak = completedLevels.length > 0 ? completedLevels.length : 0;

  const [showGuide, setShowGuide] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Mock leaderboard data
  const leaderboardData = [
    { id: "1", playerName: "DragonSlayer", totalCoins: 1500, highestBoss: 5, winStreak: 10, fastestDefeat: 45 },
    { id: "2", playerName: "MathWizard", totalCoins: 1200, highestBoss: 4, winStreak: 8, fastestDefeat: 52 },
    { id: "3", playerName: "QuizMaster", totalCoins: 950, highestBoss: 3, winStreak: 5, fastestDefeat: 60 },
    { id: "4", playerName: player?.name || "Hero", totalCoins: player?.coins || 0, highestBoss: currentLevelId, winStreak: streak, fastestDefeat: 0 },
    { id: "5", playerName: "Challenger", totalCoins: 500, highestBoss: 2, winStreak: 3, fastestDefeat: 75 },
  ];
  
  // Format subject name
  const subjectName = subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : "Quest";
  
  // Get current level info
  const currentLevel = levels.find(level => level.id === currentLevelId);
  const currentLevelName = currentLevel?.name || `Level ${currentLevelId}`;
  const currentLevelTheme = currentLevel?.theme || subjectName;

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      {/* Soft Yellow Glow Background */}
      <BackgroundGlow />
      
      <div className="flex flex-col max-w-7xl mx-auto relative z-10">
        {/* Main Content - Learning Path */}
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-row items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center -ml-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex-shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="Quiz Quest Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Navigation Bar */}
              <ExpandableTabs
                tabs={[
                  { title: "Bosh Sahifa", icon: Home },
                  { title: "Reyting", icon: Trophy },
                  { title: "Qo'llanma", icon: BookOpen },
                  { title: "Profil", icon: User },
                ]}
                className="border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shrink-0"
                activeColor="text-emerald-600 dark:text-emerald-400"
                onChange={(index) => {
                  if (index === 0) onHome?.();
                  else if (index === 1) setShowLeaderboard(true);
                  else if (index === 2) setShowGuide(true);
                  else if (index === 3) setShowProfile(true);
                }}
              />
            </div>
        </div>

          {/* Learning Path */}
          <div className="relative max-w-md mx-auto">
            {/* Nodes */}
            <div className="relative space-y-6 pb-12">
              {levels.map((level, index) => {
                const isCompleted = completedLevels.includes(level.id);
                const isBoss = level.type === "boss" || level.type === "math-boss-battle" || level.type === "algoritm-qorovuli";
                
                // Special unlock logic for coding course boss (Algoritm Qorovuli)
                let isUnlocked = false;
                if (isBoss && level.type === "algoritm-qorovuli") {
                  // Boss is only unlocked if level 3 is completed with 80%+ success
                  isUnlocked = completedLevels.includes(3);
                } else if (isBoss) {
                  // Other boss levels are always unlocked
                  isUnlocked = true;
                } else {
                  // Regular levels are unlocked if they're the current level or below
                  isUnlocked = level.id <= currentLevelId;
                }
                
                const isLocked = !isUnlocked;
                const isCurrent = level.id === currentLevelId && !isCompleted;
                
                // Alternate left and right positioning for decorative elements
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Level Node */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => !isLocked && onSelectLevel(level)}
                        disabled={isLocked}
                className={cn(
                          "relative rounded-full flex items-center justify-center transition-all transform hover:scale-110 disabled:hover:scale-100 active:scale-95",
                          // Size based on type - Ensure minimum 44px touch target
                          isBoss ? "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
                          // 3D Shadow effect
                          "shadow-[0_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-1",
                          // Completed state - Green with 3D effect
                          isCompleted && "bg-gradient-to-b from-green-400 via-emerald-500 to-emerald-600 border-[6px] border-b-[8px] border-green-700",
                          // Current state - Golden glow
                          isCurrent && !isBoss && "bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-[6px] border-b-[8px] border-amber-600 animate-pulse shadow-[0_8px_0_0_rgba(217,119,6,0.3),0_0_20px_rgba(251,191,36,0.5)]",
                          // Current boss - Epic purple/red
                          isCurrent && isBoss && "bg-gradient-to-b from-purple-400 via-fuchsia-500 to-pink-600 border-[6px] border-b-[8px] border-fuchsia-700 animate-pulse shadow-[0_8px_0_0_rgba(162,28,175,0.3),0_0_30px_rgba(217,70,239,0.6)]",
                          // Locked state - Gray 3D
                          isLocked && "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 border-[6px] border-b-[8px] border-gray-600 cursor-not-allowed opacity-70",
                          // Available state - Blue/Purple gradient
                          !isCompleted && !isCurrent && isUnlocked && !isBoss && "bg-gradient-to-b from-blue-400 via-violet-500 to-purple-600 border-[6px] border-b-[8px] border-purple-700 shadow-[0_8px_0_0_rgba(109,40,217,0.3)]",
                          // Available boss - Red gradient
                          !isCompleted && !isCurrent && isUnlocked && isBoss && "bg-gradient-to-b from-rose-400 via-red-500 to-red-600 border-[6px] border-b-[8px] border-red-800 shadow-[0_8px_0_0_rgba(153,27,27,0.3)]"
                        )}
                      >
                        {/* Inner glow/shine effect */}
                        <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/40 to-transparent opacity-50 pointer-events-none" />
                        
                        {/* Icon content */}
                        {isLocked ? (
                          <Lock className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600 drop-shadow-md" />
                        ) : isCompleted ? (
                          <CheckCircle className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white drop-shadow-lg" fill="currentColor" />
                        ) : (
                          <motion.span 
                            className="relative z-10 text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] filter brightness-110 flex items-center justify-center"
                            animate={getIconAnimation(level.icon)}
                            transition={getIconTransition(level.icon)}
                          >
                            {level.icon}
                          </motion.span>
                        )}
                        
                        {/* Completion badge */}
                        {isCompleted && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                            <Star className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
                          </div>
                        )}

                        {/* Current level START badge */}
                        {isCurrent && (
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg border-2 border-white whitespace-nowrap">
                            START
                          </div>
                        )}

                        {/* Boss indicator */}
                        {isBoss && !isLocked && (
                          <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center border-3 border-white shadow-lg animate-bounce">
                            <Swords className="w-5 h-5 text-white" />
                          </div>
                        )}

                        {/* Sparkle effect for current level */}
                        {isCurrent && (
                          <>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping" />
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-75" />
                          </>
                        )}

                      </button>

                      {/* Level Info */}
                  <div className="text-center max-w-[100px] sm:max-w-none">
                        <p className={cn(
                          "text-xs sm:text-sm font-bold truncate px-1",
                          isLocked ? "text-zinc-400" : "text-zinc-800 dark:text-white"
                        )}>
                          {level.name}
                        </p>
                        {isBoss && (
                          <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                            Boss Level
                          </p>
                        )}
                  </div>

                      {/* Unit badge for first level only */}
                      {index === 0 && (
                        <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5">
                          Unit 1
                        </Badge>
                      )}

                      {/* Animated horizontal line - shows at current level */}
                      {isCurrent && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="relative w-48 xs:w-60 sm:w-72 md:w-80 lg:w-96 h-2 sm:h-2.5 bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 mt-2 sm:mt-3 rounded-full shadow-md overflow-hidden origin-center"
                        >
                          {/* Animated shine effect */}
                          <div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            style={{
                              animation: 'shimmer 2s infinite',
                              transform: 'translateX(-100%)'
                            }}
                          />
                        </motion.div>
                      )}

                      {/* Connecting path line to next level (shows after completing this level) */}
                      {index < levels.length - 1 && (isCompleted || isCurrent) && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-6 sm:h-7 origin-top z-0"
                        >
                          <div className="w-full h-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-300 rounded-full shadow-md" />
                        </motion.div>
                      )}
                    </div>

                    {/* Decorative characters at various positions */}
                    {index === 0 && (
                      <div className="absolute left-16 sm:left-20 md:left-24 top-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full border-2 sm:border-3 md:border-4 border-amber-600 shadow-[0_3px_0_0_rgba(180,83,9,0.5)] sm:shadow-[0_5px_0_0_rgba(180,83,9,0.5)] flex items-center justify-center text-xl sm:text-2xl md:text-3xl animate-bounce">
                        🏆
                      </div>
                    )}
                    {index === 2 && (
                      <div className="absolute right-16 sm:right-20 md:right-24 top-0 w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 sm:border-3 md:border-4 border-green-600 shadow-[0_3px_0_0_rgba(5,150,105,0.5)] sm:shadow-[0_5px_0_0_rgba(5,150,105,0.5)] flex items-center justify-center text-xl sm:text-2xl md:text-3xl">
                       🎧
                      </div>
                    )}
                    {index === 1 && (
                      <div className="absolute right-16 sm:right-20 md:right-24 -top-2 w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-[0_2px_0_0_rgba(8,145,178,0.5)] sm:shadow-[0_3px_0_0_rgba(8,145,178,0.5)] flex items-center justify-center transform rotate-12">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white" />
                      </div>
                    )}

                  </motion.div>
                );
              })}

              {/* Treasure chest at the end */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex justify-center pt-4"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-4 sm:border-[6px] border-b-[6px] sm:border-b-[8px] border-amber-700 shadow-[0_6px_0_0_rgba(146,64,14,0.3),0_0_20px_rgba(251,191,36,0.4)] sm:shadow-[0_8px_0_0_rgba(146,64,14,0.3),0_0_30px_rgba(251,191,36,0.4)] flex items-center justify-center text-4xl sm:text-5xl animate-bounce">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/40 to-transparent opacity-50 pointer-events-none" />
                  <span className="relative drop-shadow-lg">🎁</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuide(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center"
            >
              {/* Modal - Stop propagation to prevent closing when clicking inside */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-[90%] sm:w-[550px] bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
              >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-400 via-green-500 to-cyan-500 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">Qanday O'ynash</h2>
                      <p className="text-xs sm:text-sm text-white/80">O'yin Qo'llanmasi</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowGuide(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                  >
                    <span className="text-white text-xl">Г—</span>
                  </button>
                </div>
              </div>

              {/* Guide Content */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                <div className="space-y-4">
                  {/* Progress Through Levels */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="text-3xl shrink-0">Ї</div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-zinc-800 dark:text-white mb-1">
                        Darslarni Yakunlash
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        Savollarga javob berib test bosqichlaridan o'ting. Har bir bosqichni o'tib, keyingisini oching!
                      </p>
                    </div>
                  </motion.div>

                  {/* Battle Bosses */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800"
                  >
                    <div className="text-3xl shrink-0">рџђ‰</div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-zinc-800 dark:text-white mb-1">
                        Bosslarni Mag'lub Etish
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        Savollarga to'g'ri javob berib bossni jarohatlang. Noto'g'ri javoblar sizni jarohatlaydi! Bossni mag'lub etib g'alaba qozoning.
                      </p>
                    </div>
                  </motion.div>

                  {/* Earn Rewards */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="text-3xl shrink-0">рџ’°</div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-zinc-800 dark:text-white mb-1">
                        Mukofotlar Topish
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        To'g'ri javoblar uchun tangalar va XP oling. Bonus zarar uchun kombinatsiyalar yarating va yutuqlarni oching!
                      </p>
                    </div>
                  </motion.div>

                  {/* Stats Explanation */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-xl border border-zinc-200 dark:border-zinc-600"
                  >
                    <h3 className="font-bold text-sm sm:text-base text-zinc-800 dark:text-white mb-3">
                      Statistika Qo'llanmasi
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                          <Flame className="w-4 h-4 text-orange-500" />
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="font-semibold text-zinc-800 dark:text-white">Ketma-ketlik:</span> Ketma-ket yakunlangan bosqichlar
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="font-semibold text-zinc-800 dark:text-white">Tangalar:</span> Jangdan olingan valyuta
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                          <Zap className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="font-semibold text-zinc-800 dark:text-white">XP:</span> Darajani oshirish uchun tajriba ballari
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Pro Tips */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
                  >
                    <div className="text-3xl shrink-0">рџ’Ў</div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-zinc-800 dark:text-white mb-1">
                        Professional Maslahatlar
                      </h3>
                      <ul className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc list-inside">
                        <li>Kritik zarbalar uchun tez javob bering!</li>
                        <li>Maxsus hujumlar uchun 3+ kombinatsiya yarating</li>
                        <li>Boss janglarida kuchaytiruvchilarni strategik ishlating</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Leaderboard Modal */}
      <AnimatePresence>
        {showLeaderboard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLeaderboard(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center"
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-[90%] sm:w-[500px] bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Reyting</h2>
                        <p className="text-xs sm:text-sm text-white/80">Eng Yaxshi O'yinchilar</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLeaderboard(false)}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                    >
                      <span className="text-white text-xl">Г—</span>
                    </button>
                  </div>
                </div>

                {/* Leaderboard Content */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                  <Leaderboard entries={leaderboardData} />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfile(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center"
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-[90%] sm:w-[500px] bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Profil</h2>
                        <p className="text-xs sm:text-sm text-white/80">O'yinchi Statistikasi</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowProfile(false)}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                    >
                      <span className="text-white text-xl">Г—</span>
                    </button>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                  <div className="space-y-4">
                    {/* Player Avatar */}
                    <div className="flex flex-col items-center gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-700">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl">
                        рџ‘¤
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-zinc-800 dark:text-white">{player?.name || "Hero"}</h3>
                        <p className="text-sm text-zinc-500">Daraja {player?.level || 1}</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                        <div className="text-2xl mb-1">рџ’°</div>
                        <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-500">{player?.coins || 0}</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Tangalar</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="text-2xl mb-1">в­ђ</div>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-500">{player?.xp || 0}</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Tajriba</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                        <div className="text-2xl mb-1">Ї</div>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-500">{completedCount}</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Yakunlangan</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                        <div className="text-2xl mb-1">рџ”Ґ</div>
                        <p className="text-2xl font-bold text-orange-700 dark:text-orange-500">{streak}</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Ketma-ketlik</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-xl border border-zinc-200 dark:border-zinc-600">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Jarayon</span>
                        <span className="text-sm font-bold text-zinc-800 dark:text-white">{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                        {completedCount} ta {totalLevels} bosqichdan yakunlangan
                      </p>
                    </div>

                    {/* Health Stats */}
                    <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">вќ¤пёЏ</span>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Salomatlik</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-red-200 dark:bg-red-900/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                            style={{ width: `${(player?.currentHealth || 100) / (player?.maxHealth || 100) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-red-700 dark:text-red-400">
                          {player?.currentHealth || 100}/{player?.maxHealth || 100}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};


