import { useState, useEffect } from "react";
import { HomePage } from "./HomePage";
import { LeaderboardPage } from "./LeaderboardPage";
import { GuidePage } from "./GuidePage";
import { ProfilePage } from "./ProfilePage";
import { BattleScreen } from "@/components/game/BattleScreen";
import { MapScreen } from "@/components/game/MapScreen";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { DefeatScreen } from "@/components/game/DefeatScreen";
import StrategicMathBattleship from "@/components/game/StrategicMathBattleship";
import BiologyCaseStudy from "@/components/game/BiologyCaseStudy";
import BiologyMemoryMatch from "@/components/game/BiologyMemoryMatch";
import BiologySortingGame from "@/components/game/BiologySortingGame";
import MutantMonsterBattle from "@/components/game/MutantMonsterBattle";
import FlashQuiz from "@/components/game/FlashQuiz";
import FixTheBug from "@/components/game/FixTheBug";
import TrueFalseCodeGame from "@/components/game/TrueFalseCodeGame";
import CodeMatchingGame from "@/components/game/CodeMatchingGame";
import EquationBuilder from "@/components/game/EquationBuilder";
import { MathBossBattle } from "@/components/game/MathBossBattle";
import AlgoritmQorovuli from "@/components/game/AlgoritmQorovuli";
import { GameState, Boss, Question, Level } from "@/types/game";
import { LEVELS, BIOLOGY_LEVELS, MATH_LEVELS, CODING_LEVELS, BOSSES, QUESTIONS } from "@/data/gameData";
import { PowerUpType } from "@/components/game/PowerUpBar";
import { toast } from "sonner";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const [gameState, setGameState] = useState<GameState>({
    player: {
      name: "Hero",
      maxHealth: 100,
      currentHealth: 100,
      coins: 0,
      xp: 0,
      level: 1
    },
    currentBoss: BOSSES[0],
    bossHealth: BOSSES[0].maxHealth,
    currentQuestion: null,
    combo: 0,
    timeLeft: 15,
    gamePhase: "map",
    powerUps: {
      heal: 2,
      shield: 1,
      timeFreeze: 1,
      doubleDamage: 1
    },
    hasShield: false,
    doubleDamageActive: false,
    isPremium: false
  });

  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  
  // Gift state management
  const [giftAvailable, setGiftAvailable] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  
  // Get the correct levels based on selected subject
  const getCurrentLevels = () => {
    if (selectedSubject === "biology") return BIOLOGY_LEVELS;
    if (selectedSubject === "math") return MATH_LEVELS;
    if (selectedSubject === "coding") return CODING_LEVELS;
    return MATH_LEVELS; // Default to math
  };
  
  const currentLevels = getCurrentLevels();
  const [currentLevel, setCurrentLevel] = useState<Level>(currentLevels[0]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  const [rewardsData, setRewardsData] = useState({
    coins: 0,
    xp: 0,
    badge: ""
  });

  useEffect(() => {
    if (gameState.gamePhase === "battle" && !gameState.currentQuestion) {
      loadNextQuestion();
    }
  }, [gameState.gamePhase, gameState.currentQuestion]);

  const handleSelectSubject = (subject: string) => {
    setSelectedSubject(subject);
    // Reset game state to start from level 1
    setCurrentLevelId(1);
    setCompletedLevels([]);
    setGameState({
      player: {
        name: "Hero",
        maxHealth: 100,
        currentHealth: 100,
        coins: 0,
        xp: 0,
        level: 1
      },
      currentBoss: BOSSES[0],
      bossHealth: BOSSES[0].maxHealth,
      currentQuestion: null,
      combo: 0,
      timeLeft: 15,
      gamePhase: "map",
      powerUps: {
        heal: 2,
        shield: 1,
        timeFreeze: 1,
        doubleDamage: 1
      },
      hasShield: false,
      doubleDamageActive: false,
      isPremium: gameState.isPremium
    });
  };

  const handleBackToMap = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
  };

  const handleBattleshipComplete = (successRate?: number) => {
    console.log('Battleship completion called with successRate:', successRate);
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Battleship completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the battleship game
      const coinsEarned = 50;
      const xpEarned = 100;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`X-O O'yini tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };


  const handleBiologyCaseStudyComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Biology case study completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the biology case study
      const coinsEarned = 100;
      const xpEarned = 200;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`Biologiya tadqiqoti tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };

  const handleBiologyMemoryMatchComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Biology memory match completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the biology memory match
      const coinsEarned = 80;
      const xpEarned = 150;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`Xotira o'yini tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };

  const handleBiologySortingComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Biology sorting completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the biology sorting game
      const coinsEarned = 90;
      const xpEarned = 180;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`Biologiya saralash o'yini tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };

  const handleMutantMonsterBattleComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher (victory)
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Mutant Monster Battle completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the mutant monster battle
      const coinsEarned = 150;
      const xpEarned = 300;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Set gift available instead of showing victory screen
      setGiftAvailable(true);
      setGiftOpened(false);
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`Mutant Monster mag'lub qilindi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to defeat monster - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Mutant sizni mag'lub qildi! Yana urinib ko'ring!");
    }
  };

  const handleFlashQuizComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Flash quiz completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the flash quiz
      const coinsEarned = 60;
      const xpEarned = 120;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`Flash Quiz tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };

  const handleEquationBuilderComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Equation builder completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the equation builder
      const coinsEarned = 70;
      const xpEarned = 140;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`Tenglama yig'uvchi o'yini tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };

  const handleFixTheBugComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Fix the bug completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the fix the bug game
      const coinsEarned = 90;
      const xpEarned = 180;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`Xatolikni tuzatish tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };

  const handleTrueFalseCodeComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('True false code completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the true false code game
      const coinsEarned = 70;
      const xpEarned = 140;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`To'g'ri yoki Noto'g'ri o'yini tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };

  const handleCodeMatchingComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Code matching completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the code matching game
      const coinsEarned = 100;
      const xpEarned = 200;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Special logic for coding course level 3 - unlock boss after completion
      if (selectedSubject === "coding" && currentLevel.id === 3) {
        // Don't advance to next level, boss will be unlocked via MapScreen logic
        console.log('Level 3 completed with 80%+, boss should now be unlocked');
        toast.success(`Kod moslashtirish tugadi! +${coinsEarned} tanga, +${xpEarned} XP! Boss ochildi!`);
      } else {
        // Move to next level only if performance was good
        const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
        console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
        setCurrentLevelId(nextLevelId);
        
        toast.success(`Kod moslashtirish tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
      }
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };


  const handleAlgoritmQorovuliComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Algoritm Qorovuli completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the final boss
      const coinsEarned = 200;
      const xpEarned = 500;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Set gift available instead of showing victory screen
      setGiftAvailable(true);
      setGiftOpened(false);
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`Algoritm Qorovuli mag'lub qilindi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };

  const handleMathBossBattleComplete = (successRate?: number) => {
    // Only mark level as completed if success rate is 80% or higher
    if (successRate && successRate >= 80) {
      setCompletedLevels(prev => {
        const newCompleted = [...new Set([...prev, currentLevel.id])];
        console.log('Math boss battle completed successfully, new completed levels:', newCompleted);
        return newCompleted;
      });
      
      // Award coins and XP for completing the math boss battle
      const coinsEarned = 150;
      const xpEarned = 300;
      
      setGameState(prev => ({
        ...prev,
        gamePhase: "map",
        player: {
          ...prev.player,
          coins: prev.player.coins + coinsEarned,
          xp: prev.player.xp + xpEarned
        }
      }));
      
      // Set gift available instead of showing victory screen
      setGiftAvailable(true);
      setGiftOpened(false);
      
      // Move to next level only if performance was good
      const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
      console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
      setCurrentLevelId(nextLevelId);
      
      toast.success(`Matematik Boss Jangi tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
    } else {
      // Failed to meet 80% requirement - stay on same level
      setGameState(prev => ({
        ...prev,
        gamePhase: "map"
      }));
      
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% muvaffaqiyat darajasi kerak!");
    }
  };

  const handleHome = () => {
    setSelectedSubject(null);
    // Reset everything
    setCurrentLevelId(1);
    setCompletedLevels([]);
    setGameState({
      player: {
        name: "Hero",
        maxHealth: 100,
        currentHealth: 100,
        coins: 0,
        xp: 0,
        level: 1
      },
      currentBoss: BOSSES[0],
      bossHealth: BOSSES[0].maxHealth,
      currentQuestion: null,
      combo: 0,
      timeLeft: 15,
      gamePhase: "map",
      powerUps: {
        heal: 2,
        shield: 1,
        timeFreeze: 1,
        doubleDamage: 1
      },
      hasShield: false,
      doubleDamageActive: false,
      isPremium: gameState.isPremium
    });
    toast.info("Bosh sahifaga qaytildi");
  };

  const loadNextQuestion = () => {
    const questions = QUESTIONS[currentLevel.theme];
    if (questions && questions.length > 0) {
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      setGameState(prev => ({
        ...prev,
        currentQuestion: randomQuestion
      }));
    }
  };

  const handleSelectLevel = (level: Level) => {
    setCurrentLevel(level);
    setQuestionsAnswered(0);
    setQuestionsCorrect(0);
    
    // For biology case study levels, start the biology case study game
    if (level.type === "biology-case-study") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "biology-case-study"
      }));
      return;
    }
    
    // For biology memory match levels, start the biology memory match game
    if (level.type === "biology-memory-match") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "biology-memory-match"
      }));
      return;
    }
    
    // For biology sorting levels, start the biology sorting game
    if (level.type === "biology-sorting") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "biology-sorting"
      }));
      return;
    }
    
    // For mutant monster battle levels, start the mutant monster battle game
    if (level.type === "mutant-monster-battle") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "mutant-monster-battle"
      }));
      return;
    }
    
    // For flash quiz levels, start the flash quiz game
    if (level.type === "flash-quiz") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "flash-quiz"
      }));
      return;
    }
    
    // For equation builder levels, start the equation builder game
    if (level.type === "equation-builder") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "equation-builder"
      }));
      return;
    }
    
    // For math boss battle levels, start the math boss battle game
    if (level.type === "math-boss-battle") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "math-boss-battle"
      }));
      return;
    }
    
    // For fix the bug levels, start the fix the bug game
    if (level.type === "fix-the-bug") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "fix-the-bug"
      }));
      return;
    }
    
    // For true false code levels, start the true false code game
    if (level.type === "true-false-code") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "true-false-code"
      }));
      return;
    }
    
    // For code matching levels, start the code matching game
    if (level.type === "code-matching") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "code-matching"
      }));
      return;
    }
    
    // For algoritm qorovuli levels, start the algoritm qorovuli game
    if (level.type === "algoritm-qorovuli") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "algoritm-qorovuli"
      }));
      return;
    }
    
    // For battleship levels, start the strategic math battleship game
    if (level.type === "battleship") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "battleship"
      }));
      return;
    }
    
    
    // For boss levels, set up boss battle
    if (level.type === "boss") {
      const boss: Boss = {
        id: level.id,
        name: level.name,
        maxHealth: level.maxHealth || 150,
        damage: level.damage || 20,
        theme: level.theme,
        difficulty: level.difficulty,
        icon: level.icon
      };
      
      setGameState(prev => ({
        ...prev,
        currentBoss: boss,
        bossHealth: boss.maxHealth,
        gamePhase: "battle",
        currentQuestion: null,
        combo: 0,
        player: {
          ...prev.player,
          currentHealth: prev.player.maxHealth
        }
      }));
    } else {
      // For test levels, just start battle with no boss health tracking
      setGameState(prev => ({
        ...prev,
        gamePhase: "battle",
        currentQuestion: null,
        combo: 0,
        player: {
          ...prev.player,
          currentHealth: prev.player.maxHealth
        }
      }));
    }
  };

  const handleAnswer = (correct: boolean, timeLeft: number) => {
    setQuestionsAnswered(prev => prev + 1);
    if (correct) {
      setQuestionsCorrect(prev => prev + 1);
    }

    // Check if it's a test level
    if (currentLevel.type === "test") {
      const requiredQuestions = currentLevel.questionsRequired || 3;
      
      // Award XP for correct answer
      if (correct) {
        setGameState(prev => ({
          ...prev,
          player: {
            ...prev.player,
            coins: prev.player.coins + 5,
            xp: prev.player.xp + 10
          },
          combo: prev.combo + 1
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          combo: 0
        }));
      }
      
      // Check if test is complete
      if (questionsAnswered + 1 >= requiredQuestions) {
        const passPercentage = ((questionsCorrect + (correct ? 1 : 0)) / requiredQuestions) * 100;
        
        if (passPercentage >= 80) {
          // Pass the test with 80% or higher
          setTimeout(() => {
            handleVictory();
          }, 1500);
        } else {
          // Fail the test - less than 80%
          setTimeout(() => {
            handleDefeat();
          }, 1500);
        }
        return;
      }
      
      // Load next question
      setTimeout(() => {
        loadNextQuestion();
      }, 1500);
    } else {
      // Boss battle logic
      setGameState(prev => {
        const newState = { ...prev };
        
        if (correct) {
          // Player attacks
          const isCritical = timeLeft > 10;
          const isSpecialAttack = prev.combo >= 3;
          let damage = 20;
          
          if (isCritical) damage += 10;
          if (isSpecialAttack) {
            damage *= 2;
            toast.success("🔥 FUSION HAREKATI FAOL!");
          }
          if (prev.doubleDamageActive) {
            damage *= 2;
            newState.doubleDamageActive = false;
          }
          
          newState.bossHealth = Math.max(0, prev.bossHealth - damage);
          newState.combo = prev.combo + 1;
          
          // Award coins for correct answers
          newState.player.coins += 5;
        } else {
          // Boss attacks
          if (prev.hasShield) {
            toast.info("🛡️ Qalqon hujumni to'sdi!");
            newState.hasShield = false;
          } else {
            const damage = prev.currentBoss.damage;
            newState.player.currentHealth = Math.max(0, prev.player.currentHealth - damage);
          }
          newState.combo = 0;
        }
        
        return newState;
      });
      
      setTimeout(() => {
        loadNextQuestion();
      }, 1500);
    }
  };

  const handlePowerUp = (type: PowerUpType) => {
    setGameState(prev => {
      if (prev.powerUps[type] <= 0) return prev;
      
      const newState = { ...prev };
      newState.powerUps[type] -= 1;
      
      switch (type) {
        case "heal":
          newState.player.currentHealth = Math.min(
            prev.player.maxHealth,
            prev.player.currentHealth + 30
          );
          toast.success("❤️ 30 HP tiklandi!");
          break;
        case "shield":
          newState.hasShield = true;
          toast.success("🛡️ Qalqon faollashtirildi!");
          break;
        case "timeFreeze":
          toast.success("⏰ Vaqt 3 soniya muzlatildi!");
          break;
        case "doubleDamage":
          newState.doubleDamageActive = true;
          toast.success("⚡ Keyingi hujum ikki barobar zarar beradi!");
          break;
      }
      
      return newState;
    });
  };

  const handleVictory = () => {
    const coinsEarned = currentLevel.type === "boss" ? 100 : 20;
    const xpEarned = currentLevel.type === "boss" ? 200 : 30;
    const badge = currentLevel.type === "boss" ? "Boss Slayer" : "";
    
    setRewardsData({
      coins: coinsEarned,
      xp: xpEarned,
      badge: badge
    });
    
    setGameState(prev => ({
      ...prev,
      gamePhase: "victory",
      player: {
        ...prev.player,
        coins: prev.player.coins + coinsEarned,
        xp: prev.player.xp + xpEarned
      }
    }));
    
    // Mark level as completed
    setCompletedLevels(prev => [...new Set([...prev, currentLevel.id])]);
    
    // Move to next level
    const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
    setCurrentLevelId(nextLevelId);
  };

  const handleGiftCoins = (coins: number) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        coins: prev.player.coins + coins
      }
    }));
  };

  const handleGiftOpen = () => {
    setShowGiftModal(true);
  };

  const handleGiftClaimed = (coins: number) => {
    setGiftOpened(true);
    setGiftAvailable(false);
    setShowGiftModal(false);
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        coins: prev.player.coins + coins
      }
    }));
    toast.success(`+${coins} tanga olindi!`);
  };

  const handleGiftClose = () => {
    setShowGiftModal(false);
  };

  const handlePremiumPurchase = () => {
    setGameState(prev => ({
      ...prev,
      isPremium: true
    }));
    toast.success("🎉 Premium Sarguzasht ochildi! Barcha imkoniyatlardan foydalanishingiz mumkin!");
  };

  const handleDefeat = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "defeat"
    }));
    
    // If failed boss level, reset to level 1
    if (currentLevel.type === "boss") {
      toast.error("Boss sizni mag'lub etdi! 1-bosqichdan boshlanadi...");
      setCurrentLevelId(1);
      setCompletedLevels([]);
    } else {
      // If failed test level, stay on same level and don't advance
      toast.error("Keyingi bosqichga o'tish uchun kamida 80% to'g'ri javoblar kerak!");
    }
  };

  const handleContinue = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
  };

  const handleRetry = () => {
    handleSelectLevel(currentLevel);
  };

  const handleLeave = () => {
    // Reset game state to initial values and return to map
    setGameState(prev => ({
      ...prev,
      gamePhase: "map",
      currentQuestion: null,
      combo: 0,
      timeLeft: 15,
      player: {
        ...prev.player,
        currentHealth: prev.player.maxHealth
      },
      bossHealth: prev.currentBoss.maxHealth,
      hasShield: false,
      doubleDamageActive: false
    }));
    
    toast.info("Xaritaga qaytildi. Jang jarayoni qayta tiklandi.");
  };

  // Exit handlers that don't progress levels
  const handleBattleshipExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("X-O o'yinidan chiqildi.");
  };

  const handleBiologyCaseStudyExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Biologiya tadqiqotidan chiqildi.");
  };

  const handleBiologyMemoryMatchExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Xotira o'yinidan chiqildi.");
  };

  const handleBiologySortingExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Saralash o'yinidan chiqildi.");
  };

  const handleMutantMonsterExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Mutant Monster jangidan chiqildi.");
  };

  const handleFlashQuizExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Flash Quiz'dan chiqildi.");
  };

  const handleEquationBuilderExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Tenglama yig'uvchidan chiqildi.");
  };

  const handleMathBossExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Matematik Boss jangidan chiqildi.");
  };

  const handleFixTheBugExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Xatolikni tuzatish o'yinidan chiqildi.");
  };

  const handleTrueFalseCodeExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("To'g'ri yoki Noto'g'ri o'yinidan chiqildi.");
  };

  const handleCodeMatchingExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Kod moslashtirish o'yinidan chiqildi.");
  };

  const handleAlgoritmQorovuliExit = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
    toast.info("Algoritm Qorovuli jangidan chiqildi.");
  };

  // Show ProfilePage if profile is requested
  if (showProfile) {
    return (
      <ProfilePage 
        onBack={() => setShowProfile(false)}
        onShowSettings={() => {
          // You can add settings functionality here later
          console.log("Show settings");
        }}
      />
    );
  }

  // Show GuidePage if guide is requested
  if (showGuide) {
    return (
      <GuidePage 
        onBack={() => setShowGuide(false)}
        onShowProfile={() => setShowProfile(true)}
      />
    );
  }

  // Show LeaderboardPage if leaderboard is requested
  if (showLeaderboard) {
    return (
      <LeaderboardPage 
        onBack={() => setShowLeaderboard(false)}
        onShowProfile={() => setShowProfile(true)}
      />
    );
  }

  // Show HomePage if no subject is selected
  if (!selectedSubject) {
    return (
      <HomePage 
        onSelectSubject={handleSelectSubject} 
        onShowLeaderboard={() => setShowLeaderboard(true)}
        onShowProfile={() => setShowProfile(true)}
        onShowGuide={() => setShowGuide(true)}
        isPremium={gameState.isPremium}
        onPremiumPurchase={handlePremiumPurchase}
      />
    );
  }

  return (
    <>
      {gameState.gamePhase === "map" && (
        <MapScreen
          levels={currentLevels}
          currentLevelId={currentLevelId}
          completedLevels={completedLevels}
          onSelectLevel={handleSelectLevel}
          player={gameState.player}
          onHome={handleHome}
          subject={selectedSubject}
          onShowProfile={() => setShowProfile(true)}
          onShowGuide={() => setShowGuide(true)}
          giftAvailable={giftAvailable}
          giftOpened={giftOpened}
          onGiftOpen={handleGiftOpen}
          onGiftClaimed={handleGiftClaimed}
          isPremium={gameState.isPremium}
          onPremiumPurchase={handlePremiumPurchase}
        />
      )}
      
      {gameState.gamePhase === "biology-case-study" && (
        <BiologyCaseStudy onLeave={handleBiologyCaseStudyComplete} onExit={handleBiologyCaseStudyExit} />
      )}
      
      {gameState.gamePhase === "biology-memory-match" && (
        <BiologyMemoryMatch onLeave={handleBiologyMemoryMatchComplete} onExit={handleBiologyMemoryMatchExit} />
      )}
      
      {gameState.gamePhase === "biology-sorting" && (
        <BiologySortingGame onLeave={handleBiologySortingComplete} onExit={handleBiologySortingExit} />
      )}
      
      {gameState.gamePhase === "mutant-monster-battle" && (
        <MutantMonsterBattle onLeave={handleMutantMonsterBattleComplete} onExit={handleMutantMonsterExit} />
      )}
      
      {gameState.gamePhase === "flash-quiz" && (
        <FlashQuiz onLeave={handleFlashQuizComplete} onExit={handleFlashQuizExit} />
      )}
      
      {gameState.gamePhase === "equation-builder" && (
        <EquationBuilder onLeave={handleEquationBuilderComplete} onExit={handleEquationBuilderExit} />
      )}
      
      {gameState.gamePhase === "math-boss-battle" && (
        <MathBossBattle onLeave={handleMathBossBattleComplete} onExit={handleMathBossExit} />
      )}
      
      {gameState.gamePhase === "fix-the-bug" && (
        <FixTheBug onLeave={handleFixTheBugComplete} onExit={handleFixTheBugExit} />
      )}
      
      {gameState.gamePhase === "true-false-code" && (
        <TrueFalseCodeGame onLeave={handleTrueFalseCodeComplete} onExit={handleTrueFalseCodeExit} />
      )}
      
      {gameState.gamePhase === "code-matching" && (
        <CodeMatchingGame onLeave={handleCodeMatchingComplete} onExit={handleCodeMatchingExit} />
      )}
      
      {gameState.gamePhase === "algoritm-qorovuli" && (
        <AlgoritmQorovuli onLeave={handleAlgoritmQorovuliComplete} onExit={handleAlgoritmQorovuliExit} />
      )}
      
      
      {gameState.gamePhase === "battleship" && (
        <StrategicMathBattleship onLeave={handleBattleshipComplete} onExit={handleBattleshipExit} />
      )}
      
      
      {gameState.gamePhase === "battle" && (
        <BattleScreen
          gameState={gameState}
          onAnswer={handleAnswer}
          onPowerUp={handlePowerUp}
          onVictory={handleVictory}
          onDefeat={handleDefeat}
          onLeave={handleLeave}
        />
      )}
      
      {gameState.gamePhase === "victory" && (
        <VictoryScreen
          bossName={currentLevel.name}
          coinsEarned={rewardsData.coins}
          xpEarned={rewardsData.xp}
          badgeEarned={rewardsData.badge}
          onContinue={handleContinue}
          onGiftCoins={handleGiftCoins}
          isBoss={currentLevel.type === "boss"}
        />
      )}
      
      {gameState.gamePhase === "defeat" && (
        <DefeatScreen
          bossName={currentLevel.name}
          onRetry={handleRetry}
          onBackToMap={handleContinue}
        />
      )}
      
    </>
  );
};

export default Index;
