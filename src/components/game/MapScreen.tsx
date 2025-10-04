import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackgroundGlow } from "@/components/ui/background-components";
import { PaywallModal } from "@/components/ui/paywall-modal";
import { Level, Player } from "@/types/game";
import { cn } from "@/lib/utils";
import { Lock, CheckCircle, Trophy, Flame, Zap, BookOpen, Star, Swords, User, Home, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  onShowProfile?: () => void;
  onShowGuide?: () => void;
  giftAvailable?: boolean;
  giftOpened?: boolean;
  onGiftOpen?: () => void;
  onGiftClaimed?: (coins: number) => void;
  isPremium?: boolean;
  onPremiumPurchase?: () => void;
}

export const MapScreen = ({ 
  levels, 
  currentLevelId, 
  completedLevels,
  onSelectLevel,
  player,
  onHome,
  subject,
  onShowProfile,
  onShowGuide,
  giftAvailable,
  giftOpened,
  onGiftOpen,
  onGiftClaimed,
  isPremium = false,
  onPremiumPurchase
}: MapScreenProps) => {
  const totalLevels = levels.length;
  const completedCount = completedLevels.length;
  const progressPercentage = (completedCount / totalLevels) * 100;
  
  // Calculate streak (for demo purposes)
  const streak = completedLevels.length > 0 ? completedLevels.length : 0;
  
  // Coin animation state
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  
  const handleGiftClick = () => {
    setShowCoinAnimation(true);
    
    // Hide animation after 3 seconds and mark as claimed
    setTimeout(() => {
      setShowCoinAnimation(false);
      // Mark gift as claimed and give 70 coins
      onGiftClaimed?.(70);
    }, 3000);
  };

  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  
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
                  { title: "Qo'llanma", icon: BookOpen },
                  { title: "Profil", icon: User },
                ]}
                className="border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shrink-0"
                activeColor="text-emerald-600 dark:text-emerald-400"
                onChange={(index) => {
                  if (index === 0) onHome?.();
                  else if (index === 1) onShowGuide?.();
                  else if (index === 2) onShowProfile?.();
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
                const isBoss = level.type === "boss" || level.type === "math-boss-battle" || level.type === "algoritm-qorovuli" || level.type === "mutant-monster-battle";
                
                // Special unlock logic for boss levels
                let isUnlocked = false;
                let isPremiumLocked = false;
                
                if (level.isPremium) {
                  // Premium levels are always visible but locked unless both conditions are met
                  const firstBossDefeated = completedLevels.includes(4);
                  isUnlocked = isPremium && firstBossDefeated;
                  isPremiumLocked = !isPremium || !firstBossDefeated; // Show locked if no premium OR first boss not defeated
                } else if (isBoss && (level.type === "algoritm-qorovuli" || level.type === "math-boss-battle" || level.type === "mutant-monster-battle")) {
                  // Boss is only unlocked if level 3 is completed with 80%+ success
                  isUnlocked = completedLevels.includes(3);
                } else if (isBoss) {
                  // Other boss levels are always unlocked
                  isUnlocked = true;
                } else {
                  // Regular levels are unlocked if they're the current level or below
                  isUnlocked = level.id <= currentLevelId;
                }
                
                const isLocked = !isUnlocked && !isPremiumLocked;
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
                        onClick={() => {
                          if (isPremiumLocked) {
                            if (level.isPremium && !completedLevels.includes(4)) {
                              // Show message that first boss needs to be defeated
                              // For now, just open paywall - you can add a different modal later
                              setShowPaywall(true);
                            } else {
                              setShowPaywall(true);
                            }
                          } else if (!isLocked) {
                            onSelectLevel(level);
                          }
                        }}
                        disabled={isLocked && !isPremiumLocked}
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
                          // Premium locked state - Golden gradient with reduced opacity
                          isPremiumLocked && level.isPremium && "bg-gradient-to-b from-yellow-400 via-amber-500 to-orange-600 border-[6px] border-b-[8px] border-orange-700 opacity-50 hover:opacity-70 cursor-pointer",
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
                        ) : isPremiumLocked && level.isPremium ? (
                          <div className="relative z-10 flex flex-col items-center">
                            <Lock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-lg mb-1" />
                            <span className="text-xs sm:text-sm font-bold text-white drop-shadow-md">
                              {completedLevels.includes(4) ? "PREMIUM" : "BOSS FIRST"}
                            </span>
                          </div>
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

                        {/* Premium indicator */}
                        {level.isPremium && !isLocked && (
                          <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg animate-pulse">
                            <Star className="w-5 h-5 text-white" />
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
                          isLocked ? "text-zinc-400" : isPremiumLocked ? "text-yellow-400" : "text-zinc-800 dark:text-white"
                        )}>
                          {level.name}
                        </p>
                        {isBoss && (
                          <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                            Boss Level
                          </p>
                        )}
                        {level.isPremium && (
                          <p className="text-[10px] sm:text-xs text-yellow-500 dark:text-yellow-400 font-semibold">
                            {isPremiumLocked ? 
                              (completedLevels.includes(4) ? "Premium Locked" : "Defeat Boss First") : 
                              "Premium Level"
                            }
                          </p>
                        )}
                  </div>

                      {/* Unit badge for first level only */}
                      {index === 0 && (
                        <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5">
                          Unit 1
                        </Badge>
                      )}

                      {/* Unit badge for first premium level */}
                      {level.isPremium && index === 4 && (
                        <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-500">
                          Unit 2 - Premium
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


              {/* Gift Button - appears after boss completion */}
              {giftAvailable && !giftOpened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative flex justify-center pt-4"
                >
                  <button
                    onClick={handleGiftClick}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 border-4 sm:border-[6px] border-b-[6px] sm:border-b-[8px] border-orange-700 shadow-[0_8px_0_0_rgba(194,65,12,0.3),0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center text-4xl sm:text-5xl hover:scale-110 transition-transform cursor-pointer"
                  >
                    <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/40 to-transparent opacity-50 pointer-events-none" />
                    <span className="relative drop-shadow-lg text-7xl">🪙</span>
                  </button>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <p className="text-white text-xs sm:text-sm font-bold bg-black/50 px-2 py-1 rounded-full">
                      +70 tanga olish!
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Coin Animation */}
              <AnimatePresence>
                {showCoinAnimation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/30"
                  >
                    <div className="relative">
                      {/* Reward Card */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", type: "spring" }}
                        className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-3xl shadow-2xl border-4 border-white/30"
                      >
                        <div className="text-center space-y-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-6xl"
                          >
                            💰
                          </motion.div>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-4xl font-black text-white"
                          >
                            +70
                          </motion.div>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="text-lg font-bold text-white/90"
                          >
                            TANGA OLINDI!
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      {/* Sparkle Effects */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0, 
                            opacity: 0
                          }}
                          animate={{ 
                            x: Math.cos(i * 45 * Math.PI / 180) * 100,
                            y: Math.sin(i * 45 * Math.PI / 180) * 100,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 1.5,
                            delay: 0.5 + i * 0.1,
                            ease: "easeOut"
                          }}
                          className="absolute text-2xl"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          ✨
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Premium Unlock Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="sticky bottom-0 w-full z-20"
        >
          {isPremium ? (
            /* Premium Unlocked State */
            <div className="w-full py-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 shadow-lg">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Crown className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-white font-bold text-lg">
                    Premium Sarguzasht ochilgan!
                  </span>
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Crown className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            /* Premium Locked State */
            <div className="w-full py-4 bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 border-t border-white/20 shadow-lg backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-center gap-4">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Lock className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                  
                  <span className="text-white font-medium text-center flex-1">
                    Qo'shimcha darajalarni ochish uchun to'lang
                  </span>
                  
                  <Button
                    onClick={() => setShowPaywall(true)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Darajalarni ochish
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchase={() => {
          onPremiumPurchase?.();
          setShowPaywall(false);
        }}
      />
    </div>
  );
};