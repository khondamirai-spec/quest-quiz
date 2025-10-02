import { useState, useEffect } from "react";
import { HomePage } from "./HomePage";
import { BattleScreen } from "@/components/game/BattleScreen";
import { MapScreen } from "@/components/game/MapScreen";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { DefeatScreen } from "@/components/game/DefeatScreen";
import { GameState, Boss, Question, Level } from "@/types/game";
import { LEVELS, BOSSES, QUESTIONS } from "@/data/gameData";
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
  const [currentLevel, setCurrentLevel] = useState<Level>(LEVELS[0]);
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
    toast.success(`${subject.charAt(0).toUpperCase() + subject.slice(1)} quest started!`);
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
    const nextLevelId = Math.min(LEVELS.length, currentLevel.id + 1);
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
          levels={LEVELS}
          currentLevelId={currentLevelId}
          completedLevels={completedLevels}
          onSelectLevel={handleSelectLevel}
          player={gameState.player}
          onHome={handleHome}
          subject={selectedSubject}
        />
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
