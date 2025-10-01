import { useState, useEffect } from "react";
import { BattleScreen } from "@/components/game/BattleScreen";
import { MapScreen } from "@/components/game/MapScreen";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { DefeatScreen } from "@/components/game/DefeatScreen";
import { GameState, Boss, Question } from "@/types/game";
import { BOSSES, QUESTIONS } from "@/data/gameData";
import { PowerUpType } from "@/components/game/PowerUpBar";
import { toast } from "sonner";

const Index = () => {
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

  const [currentBossId, setCurrentBossId] = useState(1);
  const [defeatedBosses, setDefeatedBosses] = useState<number[]>([]);
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

  const loadNextQuestion = () => {
    const questions = QUESTIONS[gameState.currentBoss.theme];
    if (questions && questions.length > 0) {
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      setGameState(prev => ({
        ...prev,
        currentQuestion: randomQuestion
      }));
    }
  };

  const handleSelectBoss = (boss: Boss) => {
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
  };

  const handleAnswer = (correct: boolean, timeLeft: number) => {
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
    const coinsEarned = 50 * gameState.currentBoss.difficulty;
    const xpEarned = 100 * gameState.currentBoss.difficulty;
    const badges = ["Boss Slayer", "Dragon Master", "Ultimate Champion", "Legend"];
    const badgeEarned = gameState.currentBoss.difficulty > 2 ? 
      badges[gameState.currentBoss.difficulty - 1] : "";
    
    setRewardsData({
      coins: coinsEarned,
      xp: xpEarned,
      badge: badgeEarned
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
    
    setDefeatedBosses(prev => [...new Set([...prev, gameState.currentBoss.id])]);
    setCurrentBossId(Math.min(4, gameState.currentBoss.id + 1));
  };

  const handleDefeat = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "defeat"
    }));
    setCurrentBossId(1);
  };

  const handleContinue = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "map"
    }));
  };

  const handleRetry = () => {
    handleSelectBoss(gameState.currentBoss);
  };

  return (
    <>
      {gameState.gamePhase === "map" && (
        <MapScreen
          bosses={BOSSES}
          currentBossId={currentBossId}
          defeatedBosses={defeatedBosses}
          onSelectBoss={handleSelectBoss}
        />
      )}
      
      {gameState.gamePhase === "battle" && (
        <BattleScreen
          gameState={gameState}
          onAnswer={handleAnswer}
          onPowerUp={handlePowerUp}
          onVictory={handleVictory}
          onDefeat={handleDefeat}
        />
      )}
      
      {gameState.gamePhase === "victory" && (
        <VictoryScreen
          bossName={gameState.currentBoss.name}
          coinsEarned={rewardsData.coins}
          xpEarned={rewardsData.xp}
          badgeEarned={rewardsData.badge}
          onContinue={handleContinue}
        />
      )}
      
      {gameState.gamePhase === "defeat" && (
        <DefeatScreen
          bossName={gameState.currentBoss.name}
          onRetry={handleRetry}
          onBackToMap={handleContinue}
        />
      )}
    </>
  );
};

export default Index;
