import { useState, useEffect } from "react";
import { HomePage } from "./HomePage";
import { BattleScreen } from "@/components/game/BattleScreen";
import { MapScreen } from "@/components/game/MapScreen";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { DefeatScreen } from "@/components/game/DefeatScreen";
import StrategicMathBattleship from "@/components/game/StrategicMathBattleship";
import BiologyCaseStudy from "@/components/game/BiologyCaseStudy";
import BiologyMemoryMatch from "@/components/game/BiologyMemoryMatch";
import FlashQuiz from "@/components/game/FlashQuiz";
import FixTheBug from "@/components/game/FixTheBug";
import TrueFalseCodeGame from "@/components/game/TrueFalseCodeGame";
import { GameState, Boss, Question, Level } from "@/types/game";
import { LEVELS, BIOLOGY_LEVELS, MATH_LEVELS, CODING_LEVELS, BOSSES, QUESTIONS } from "@/data/gameData";
import { PowerUpType } from "@/components/game/PowerUpBar";
import { toast } from "sonner";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
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
    doubleDamageActive: false
  });

  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  
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
      doubleDamageActive: false
    });
  };

  const handleBackToMap = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
  };

  const handleBattleshipComplete = () => {
    // Mark the battleship level as completed
    setCompletedLevels(prev => {
      const newCompleted = [...new Set([...prev, currentLevel.id])];
      console.log('Battleship completed, new completed levels:', newCompleted);
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
    
    // Move to next level
    const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
    console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
    setCurrentLevelId(nextLevelId);
    
    toast.success(`X-O O'yini tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
  };


  const handleBiologyCaseStudyComplete = () => {
    // Mark the biology case study level as completed
    setCompletedLevels(prev => {
      const newCompleted = [...new Set([...prev, currentLevel.id])];
      console.log('Biology case study completed, new completed levels:', newCompleted);
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
    
    // Move to next level
    const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
    console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
    setCurrentLevelId(nextLevelId);
    
    toast.success(`Biologiya tadqiqoti tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
  };

  const handleBiologyMemoryMatchComplete = () => {
    // Mark the biology memory match level as completed
    setCompletedLevels(prev => {
      const newCompleted = [...new Set([...prev, currentLevel.id])];
      console.log('Biology memory match completed, new completed levels:', newCompleted);
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
    
    // Move to next level
    const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
    console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
    setCurrentLevelId(nextLevelId);
    
    toast.success(`Xotira o'yini tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
  };

  const handleFlashQuizComplete = () => {
    // Mark the flash quiz level as completed
    setCompletedLevels(prev => {
      const newCompleted = [...new Set([...prev, currentLevel.id])];
      console.log('Flash quiz completed, new completed levels:', newCompleted);
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
    
    // Move to next level
    const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
    console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
    setCurrentLevelId(nextLevelId);
    
    toast.success(`Flash Quiz tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
  };

  const handleFixTheBugComplete = () => {
    // Mark the fix the bug level as completed
    setCompletedLevels(prev => {
      const newCompleted = [...new Set([...prev, currentLevel.id])];
      console.log('Fix the bug completed, new completed levels:', newCompleted);
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
    
    // Move to next level
    const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
    console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
    setCurrentLevelId(nextLevelId);
    
    toast.success(`Xatolikni tuzatish tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
  };

  const handleTrueFalseCodeComplete = () => {
    // Mark the true false code level as completed
    setCompletedLevels(prev => {
      const newCompleted = [...new Set([...prev, currentLevel.id])];
      console.log('True false code completed, new completed levels:', newCompleted);
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
    
    // Move to next level
    const nextLevelId = Math.min(currentLevels.length, currentLevel.id + 1);
    console.log('Moving from level', currentLevel.id, 'to level', nextLevelId);
    setCurrentLevelId(nextLevelId);
    
    toast.success(`To'g'ri yoki Noto'g'ri o'yini tugadi! +${coinsEarned} tanga, +${xpEarned} XP!`);
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
      doubleDamageActive: false
    });
    toast.info("Returned to home page");
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
    
    // For flash quiz levels, start the flash quiz game
    if (level.type === "flash-quiz") {
      setGameState(prev => ({
        ...prev,
        gamePhase: "flash-quiz"
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
        
        if (passPercentage >= 60) {
          // Pass the test
          setTimeout(() => {
            handleVictory();
          }, 1500);
        } else {
          // Fail the test
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
            toast.success("🔥 FUSION MOVE ACTIVATED!");
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
            toast.info("🛡️ Shield blocked the attack!");
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
          toast.success("❤️ Healed 30 HP!");
          break;
        case "shield":
          newState.hasShield = true;
          toast.success("🛡️ Shield activated!");
          break;
        case "timeFreeze":
          toast.success("⏰ Time frozen for 3 seconds!");
          break;
        case "doubleDamage":
          newState.doubleDamageActive = true;
          toast.success("⚡ Next attack deals double damage!");
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

  const handleDefeat = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "defeat"
    }));
    
    // If failed boss level, reset to level 1
    if (currentLevel.type === "boss") {
      toast.error("Boss defeated you! Starting from Level 1...");
      setCurrentLevelId(1);
      setCompletedLevels([]);
    }
    // If failed test level, stay on same level
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
    
    toast.info("Returned to map. Your battle progress has been reset.");
  };

  // Show HomePage if no subject is selected
  if (!selectedSubject) {
    return <HomePage onSelectSubject={handleSelectSubject} />;
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
        />
      )}
      
      {gameState.gamePhase === "biology-case-study" && (
        <BiologyCaseStudy onLeave={handleBiologyCaseStudyComplete} />
      )}
      
      {gameState.gamePhase === "biology-memory-match" && (
        <BiologyMemoryMatch onLeave={handleBiologyMemoryMatchComplete} />
      )}
      
      {gameState.gamePhase === "flash-quiz" && (
        <FlashQuiz onLeave={handleFlashQuizComplete} />
      )}
      
      {gameState.gamePhase === "fix-the-bug" && (
        <FixTheBug onLeave={handleFixTheBugComplete} />
      )}
      
      {gameState.gamePhase === "true-false-code" && (
        <TrueFalseCodeGame onLeave={handleTrueFalseCodeComplete} />
      )}
      
      {gameState.gamePhase === "battleship" && (
        <StrategicMathBattleship onLeave={handleBattleshipComplete} />
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
