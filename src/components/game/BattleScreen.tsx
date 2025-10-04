'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "./Avatar";
import { HealthBar } from "./HealthBar";
import { QuestionPanel } from "./QuestionPanel";
import { Timer } from "./Timer";
import { PowerUpBar, PowerUpType } from "./PowerUpBar";
import { ComboIndicator } from "./ComboIndicator";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { GameState, Question } from "@/types/game";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { X, AlertTriangle } from "lucide-react";

interface BattleScreenProps {
  gameState: GameState;
  onAnswer: (correct: boolean, timeLeft: number) => void;
  onPowerUp: (type: PowerUpType) => void;
  onVictory: () => void;
  onDefeat: () => void;
  onLeave?: () => void;
}

const MAX_TIME = 15;

export const BattleScreen = ({ 
  gameState, 
  onAnswer, 
  onPowerUp,
  onVictory,
  onDefeat,
  onLeave 
}: BattleScreenProps) => {
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isBossAttacking, setIsBossAttacking] = useState(false);
  const [isPlayerHurt, setIsPlayerHurt] = useState(false);
  const [isBossHurt, setIsBossHurt] = useState(false);
  const [flash, setFlash] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);

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
          toast.info("Maslahat ochildi! Vaqt uzaytirildi.");
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
    } else if (gameState.player?.currentHealth <= 0) {
      onDefeat();
    }
  }, [gameState.bossHealth, gameState.player?.currentHealth]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setBossAttacking(true);
    setPlayerHurt(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
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
      setFlash(true);
      const isCritical = timeBonus > 10;
      if (isCritical) {
        toast.success("🔥 KRITIK ZARB!");
      }
    } else {
      setBossAttacking(true);
      setPlayerHurt(true);
      setFlash(true);
      toast.error("Noto'g'ri javob!");
    }
    
    setTimeout(() => setFlash(false), 500);
    
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

  if (!gameState.currentQuestion || !gameState.player) {
    return <div className="text-center text-2xl">O'yin yuklanmoqda...</div>;
  }

  const specialAttackReady = gameState.combo >= 3;
  const bossInRage = gameState.bossHealth < gameState.currentBoss.maxHealth * 0.2;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 p-4 md:p-6 lg:p-8">
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
              "radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 0, 0, 0.2) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
        
        {/* Floating particles */}
        {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
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

      {/* Flash Effect */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-red-600 pointer-events-none z-40"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <ComboIndicator combo={gameState.combo} specialAttackReady={specialAttackReady} />
            <Timer seconds={timeLeft} maxSeconds={MAX_TIME} />
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <PowerUpBar 
              powerUps={gameState.powerUps} 
              onUsePowerUp={onPowerUp}
              disabled={isAnswered}
            />
            
            {/* Leave Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLeaveDialog(true)}
              className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800"
            >
              <X className="w-4 h-4 mr-1" />
              Chiqish
            </Button>
          </div>
        </div>

        {/* Battle Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8 items-start lg:items-center">
          {/* Mobile: Boss First */}
          <div className="space-y-3 sm:space-y-4 lg:hidden order-1">
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
          <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
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
            <div className="flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
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
          <div className="space-y-3 sm:space-y-4 hidden lg:block order-4 lg:order-3">
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
              <p className="text-xs sm:text-sm text-muted-foreground">{gameState.currentBoss.theme}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Confirmation Dialog */}
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              O'yindan chiqish?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bu jangdan chiqishni xohlaysizmi? Bu o'yin uchun barcha taraqqiyot yo'qoladi va qaytadan boshlash kerak bo'ladi.
              <br /><br />
              <strong>Bunga quyidagilar kiradi:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Joriy sog'lik va taraqqiyot</li>
                <li>Javob berilgan savollar</li>
                <li>Ishlatilgan kuchaytirgichlar</li>
                <li>Kombinatsiya seriyalari</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>O'yinda qolish</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowLeaveDialog(false);
                onLeave?.();
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              O'yindan chiqish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
