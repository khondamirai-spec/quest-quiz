import { useState, useEffect } from "react";
import { Avatar } from "./Avatar";
import { HealthBar } from "./HealthBar";
import { QuestionPanel } from "./QuestionPanel";
import { Timer } from "./Timer";
import { PowerUpBar, PowerUpType } from "./PowerUpBar";
import { ComboIndicator } from "./ComboIndicator";
import { Button } from "@/components/ui/button";
import { GameState, Question } from "@/types/game";
import { toast } from "sonner";

interface BattleScreenProps {
  gameState: GameState;
  onAnswer: (correct: boolean, timeLeft: number) => void;
  onPowerUp: (type: PowerUpType) => void;
  onVictory: () => void;
  onDefeat: () => void;
}

const MAX_TIME = 15;

export const BattleScreen = ({ 
  gameState, 
  onAnswer, 
  onPowerUp,
  onVictory,
  onDefeat 
}: BattleScreenProps) => {
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isBossAttacking, setIsBossAttacking] = useState(false);
  const [isPlayerHurt, setIsPlayerHurt] = useState(false);
  const [isBossHurt, setIsBossHurt] = useState(false);

  useEffect(() => {
    if (isAnswered || !gameState.currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        if (prev === 5 && !showHint) {
          setShowHint(true);
          toast.info("Hint revealed! Timer extended.");
          return 7;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnswered, gameState.currentQuestion, showHint]);

  useEffect(() => {
    if (gameState.bossHealth <= 0) {
      onVictory();
    } else if (gameState.player.currentHealth <= 0) {
      onDefeat();
    }
  }, [gameState.bossHealth, gameState.player.currentHealth]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setBossAttacking(true);
    onAnswer(false, 0);
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    const correct = index === gameState.currentQuestion?.correctAnswer;
    const timeBonus = timeLeft;
    
    if (correct) {
      setPlayerAttacking(true);
      setBossHurt(true);
      const isCritical = timeBonus > 10;
      if (isCritical) {
        toast.success("🔥 CRITICAL HIT!");
      }
    } else {
      setBossAttacking(true);
      setPlayerHurt(true);
      toast.error("Wrong answer!");
    }
    
    onAnswer(correct, timeBonus);
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(MAX_TIME);
    setShowHint(false);
    setIsPlayerAttacking(false);
    setIsBossAttacking(false);
    setIsPlayerHurt(false);
    setIsBossHurt(false);
  };

  const setPlayerAttacking = (attacking: boolean) => {
    setIsPlayerAttacking(attacking);
    setTimeout(() => setIsPlayerAttacking(false), 500);
  };

  const setBossAttacking = (attacking: boolean) => {
    setIsBossAttacking(attacking);
    setTimeout(() => setIsBossAttacking(false), 500);
  };

  const setBossHurt = (hurt: boolean) => {
    setIsBossHurt(hurt);
    setTimeout(() => setIsBossHurt(false), 500);
  };

  const setPlayerHurt = (hurt: boolean) => {
    setIsPlayerHurt(hurt);
    setTimeout(() => setIsPlayerHurt(false), 500);
  };

  if (!gameState.currentQuestion) {
    return <div className="text-center text-2xl">Loading next question...</div>;
  }

  const specialAttackReady = gameState.combo >= 3;
  const bossInRage = gameState.bossHealth < gameState.currentBoss.maxHealth * 0.2;

  return (
    <div className="min-h-screen bg-gradient-game p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <ComboIndicator combo={gameState.combo} specialAttackReady={specialAttackReady} />
          <Timer seconds={timeLeft} maxSeconds={MAX_TIME} />
          <PowerUpBar 
            powerUps={gameState.powerUps} 
            onUsePowerUp={onPowerUp}
            disabled={isAnswered}
          />
        </div>

        {/* Battle Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 items-start lg:items-center">
          {/* Mobile: Boss First */}
          <div className="space-y-4 lg:hidden order-1">
            <Avatar
              type="boss"
              name={gameState.currentBoss.name}
              level={gameState.currentBoss.difficulty}
              isAttacking={isBossAttacking}
              isHurt={isBossHurt}
              inRageMode={bossInRage}
              icon={gameState.currentBoss.icon}
            />
            <HealthBar
              current={gameState.bossHealth}
              max={gameState.currentBoss.maxHealth}
              type="boss"
            />
          </div>

          {/* Player Side */}
          <div className="space-y-4 order-2 lg:order-1">
            <Avatar
              type="player"
              name={gameState.player.name}
              level={gameState.player.level}
              isAttacking={isPlayerAttacking}
              isHurt={isPlayerHurt}
              hasShield={gameState.hasShield}
            />
            <HealthBar
              current={gameState.player.currentHealth}
              max={gameState.player.maxHealth}
              type="player"
            />
            <div className="flex justify-center gap-6 text-sm">
              <span className="text-muted-foreground">💰 {gameState.player.coins}</span>
              <span className="text-muted-foreground">⭐ {gameState.player.xp} XP</span>
            </div>
          </div>

          {/* Question Panel */}
          <div className="order-3 lg:order-2">
            <QuestionPanel
              question={gameState.currentQuestion.question}
              answers={gameState.currentQuestion.answers}
              selectedAnswer={selectedAnswer}
              correctAnswer={gameState.currentQuestion.correctAnswer}
              onAnswer={handleAnswer}
              showHint={showHint}
              hint={gameState.currentQuestion.hint}
              isAnswered={isAnswered}
            />
          </div>

          {/* Boss Side - Desktop Only */}
          <div className="space-y-4 hidden lg:block order-4 lg:order-3">
            <Avatar
              type="boss"
              name={gameState.currentBoss.name}
              level={gameState.currentBoss.difficulty}
              isAttacking={isBossAttacking}
              isHurt={isBossHurt}
              inRageMode={bossInRage}
              icon={gameState.currentBoss.icon}
            />
            <HealthBar
              current={gameState.bossHealth}
              max={gameState.currentBoss.maxHealth}
              type="boss"
            />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{gameState.currentBoss.theme}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
