import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Sword, 
  Shield, 
  Heart, 
  Zap, 
  Home,
  Trophy,
  Play,
  Target,
  Skull,
  Crown
} from "lucide-react";

interface MathProblem {
  id: number;
  question: string;
  answer: number;
  explanation: string;
}

interface GameStats {
  playerHP: number;
  bossHP: number;
  currentProblem: number;
  totalProblems: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const MATH_PROBLEMS: MathProblem[] = [
  {
    id: 1,
    question: "7 × 6 = ?",
    answer: 42,
    explanation: "7 × 6 = 42"
  },
  {
    id: 2,
    question: "15 − 8 = ?",
    answer: 7,
    explanation: "15 − 8 = 7"
  },
  {
    id: 3,
    question: "12 ÷ 3 = ?",
    answer: 4,
    explanation: "12 ÷ 3 = 4"
  },
  {
    id: 4,
    question: "9 + 14 = ?",
    answer: 23,
    explanation: "9 + 14 = 23"
  },
  {
    id: 5,
    question: "18 − 5 = ?",
    answer: 13,
    explanation: "18 − 5 = 13"
  },
  {
    id: 6,
    question: "4 × 9 = ?",
    answer: 36,
    explanation: "4 × 9 = 36"
  },
  {
    id: 7,
    question: "25 ÷ 5 = ?",
    answer: 5,
    explanation: "25 ÷ 5 = 5"
  }
];

interface MathBossBattleProps {
  onLeave?: (successRate?: number) => void;
}

export const MathBossBattle = ({ onLeave }: MathBossBattleProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'victory' | 'defeat'>('menu');
  const [gameStats, setGameStats] = useState<GameStats>({
    playerHP: 30,
    bossHP: 50,
    currentProblem: 1,
    totalProblems: 7,
    correctAnswers: 0,
    wrongAnswers: 0
  });

  const [currentProblem, setCurrentProblem] = useState<MathProblem>(MATH_PROBLEMS[0]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [damageAnimation, setDamageAnimation] = useState<'player' | 'boss' | null>(null);

  const startGame = () => {
    setGameState('playing');
    setGameStats({
      playerHP: 30,
      bossHP: 50,
      currentProblem: 1,
      totalProblems: 7,
      correctAnswers: 0,
      wrongAnswers: 0
    });
    setCurrentProblem(MATH_PROBLEMS[0]);
    setUserAnswer("");
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowResult(false);
    setGameCompleted(false);
  };

  const checkAnswer = () => {
    const userAnswerNum = parseInt(userAnswer);
    const isAnswerCorrect = userAnswerNum === currentProblem.answer;

    setIsCorrect(isAnswerCorrect);
    setIsSubmitted(true);
    setShowResult(true);

    if (isAnswerCorrect) {
      // Player attacks boss
      setGameStats(prev => ({
        ...prev,
        bossHP: Math.max(0, prev.bossHP - 10),
        correctAnswers: prev.correctAnswers + 1
      }));
      setDamageAnimation('boss');
    } else {
      // Boss attacks player
      setGameStats(prev => ({
        ...prev,
        playerHP: Math.max(0, prev.playerHP - 5),
        wrongAnswers: prev.wrongAnswers + 1
      }));
      setDamageAnimation('player');
    }

    // Check if game is over
    setTimeout(() => {
      if (isAnswerCorrect && gameStats.bossHP - 10 <= 0) {
        setGameState('victory');
        setGameCompleted(true);
      } else if (!isAnswerCorrect && gameStats.playerHP - 5 <= 0) {
        setGameState('defeat');
        setGameCompleted(true);
      } else if (gameStats.currentProblem >= gameStats.totalProblems) {
        // Game completed but check who won
        if (gameStats.bossHP <= 0) {
          setGameState('victory');
        } else {
          setGameState('defeat');
        }
        setGameCompleted(true);
      }
    }, 2000);
  };

  const nextProblem = () => {
    if (gameStats.currentProblem < gameStats.totalProblems) {
      setGameStats(prev => ({
        ...prev,
        currentProblem: prev.currentProblem + 1
      }));
      setCurrentProblem(MATH_PROBLEMS[gameStats.currentProblem]);
      setUserAnswer("");
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowResult(false);
      setDamageAnimation(null);
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setGameStats({
      playerHP: 30,
      bossHP: 50,
      currentProblem: 1,
      totalProblems: 7,
      correctAnswers: 0,
      wrongAnswers: 0
    });
    setGameCompleted(false);
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-8 relative">
        {/* Leave button */}
        {onLeave && (
          <Button 
            onClick={() => onLeave()}
            variant="outline"
            size="sm"
            className="fixed top-4 left-4 bg-red-600/20 border-red-500 text-red-300 hover:bg-red-600/30 hover:text-white hover:border-red-400 z-50 shadow-lg"
          >
            <Home className="w-4 h-4 mr-1" />
            Chiqish
          </Button>
        )}
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 mt-16"
          >
            <motion.div 
              className="text-8xl mb-6"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⚔️
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">Matematik Boss Jangi</h1>
            <p className="text-xl text-gray-300">Matematik masalalarni yechib bossni mag'lub qiling!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Sword className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">7 Masala</h3>
                <p className="text-gray-300">Matematik jang</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">HP: 30</h3>
                <p className="text-gray-300">O'yinchi sog'lig'i</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Skull className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Boss HP: 50</h3>
                <p className="text-gray-300">Kuchli raqib</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-20 py-8 text-3xl md:px-24 md:py-10 md:text-4xl"
            >
              <Play className="w-8 h-8 mr-3" />
              Jangni Boshlash
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'victory') {
    const successRate = Math.round((gameStats.correctAnswers / gameStats.totalProblems) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Crown className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-4">
              Tabriklaymiz!
            </h1>
            <p className="text-2xl text-green-300 mb-4">
              Bossni mag'lub qildingiz!
            </p>
            <p className="text-xl text-gray-300">
              Siz {gameStats.correctAnswers} ta masalani to'g'ri yechdingiz!
            </p>
          </motion.div>

          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Jang Natijalari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">{gameStats.correctAnswers}</div>
                  <div className="text-gray-300">To'g'ri Javoblar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400">{gameStats.wrongAnswers}</div>
                  <div className="text-gray-300">Noto'g'ri Javoblar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">{successRate}%</div>
                  <div className="text-gray-300">G'alaba</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Sword className="w-6 h-6 mr-2" />
              Qaytadan o'ynash
            </Button>
            
            {onLeave && (
              <Button 
                onClick={() => onLeave(successRate)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Home className="w-6 h-6 mr-2" />
                Keyingi level
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'defeat') {
    const successRate = Math.round((gameStats.correctAnswers / gameStats.totalProblems) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Skull className="w-32 h-32 text-red-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-4">
              Mag'lub bo'ldingiz!
            </h1>
            <p className="text-2xl text-red-300 mb-4">
              Yana urinib ko'ring!
            </p>
            <p className="text-xl text-gray-300">
              Siz {gameStats.correctAnswers} ta masalani to'g'ri yechdingiz!
            </p>
          </motion.div>

          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Jang Natijalari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">{gameStats.correctAnswers}</div>
                  <div className="text-gray-300">To'g'ri Javoblar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400">{gameStats.wrongAnswers}</div>
                  <div className="text-gray-300">Noto'g'ri Javoblar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">{successRate}%</div>
                  <div className="text-gray-300">Natija</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            >
              <Sword className="w-6 h-6 mr-2" />
              Qaytadan o'ynash
            </Button>
            
            {onLeave && (
              <Button 
                onClick={() => onLeave(successRate)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Home className="w-6 h-6 mr-2" />
                Keyingi level
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4 relative">
      {/* Leave button */}
      {onLeave && (
        <Button 
          onClick={() => onLeave()}
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 bg-red-600/20 border-red-500 text-red-300 hover:bg-red-600/30 hover:text-white hover:border-red-400 z-50 shadow-lg"
        >
          <Home className="w-4 h-4 mr-1" />
          Chiqish
        </Button>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Badge variant="outline" className="text-white border-slate-600">
              <Target className="w-4 h-4 mr-1" />
              Masala: {gameStats.currentProblem}/{gameStats.totalProblems}
            </Badge>
            <Badge variant="outline" className="text-white border-slate-600">
              <Trophy className="w-4 h-4 mr-1" />
              To'g'ri: {gameStats.correctAnswers}
            </Badge>
          </div>
        </div>

        {/* HP Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Player HP */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-green-400" />
                <span>O'yinchi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>HP</span>
                  <span>{gameStats.playerHP}/30</span>
                </div>
                <Progress 
                  value={(gameStats.playerHP / 30) * 100} 
                  className="h-4"
                />
                {damageAnimation === 'player' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center text-red-400 font-bold"
                  >
                    -5 HP!
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Boss HP */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Skull className="w-6 h-6 text-red-400" />
                <span>Boss</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>HP</span>
                  <span>{gameStats.bossHP}/50</span>
                </div>
                <Progress 
                  value={(gameStats.bossHP / 50) * 100} 
                  className="h-4"
                />
                {damageAnimation === 'boss' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center text-green-400 font-bold"
                  >
                    -10 HP!
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Math Problem */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-2xl">🧮</span>
              <span>Matematik Masala</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-6">
                {currentProblem.question}
              </div>
              
              <div className="max-w-md mx-auto">
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Javobingizni kiriting..."
                  className="text-center text-2xl h-16"
                  disabled={isSubmitted}
                />
              </div>
            </div>

            {showResult && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`p-6 rounded-lg text-center border-2 ${
                  isCorrect ? 'bg-green-800/50 border-green-500' : 'bg-red-800/50 border-red-500'
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  {isCorrect ? (
                    <Zap className="w-8 h-8 text-green-400 mr-3" />
                  ) : (
                    <Shield className="w-8 h-8 text-red-400 mr-3" />
                  )}
                  <span className={`font-bold text-2xl ${
                    isCorrect ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {isCorrect ? "Kuchli zarba!" : "Boss sizga zarba berdi!"}
                  </span>
                </div>
                <div className="text-lg text-gray-300">
                  {currentProblem.explanation}
                </div>
              </motion.div>
            )}

            <div className="flex justify-center">
              {!isSubmitted ? (
                <Button 
                  onClick={checkAnswer}
                  disabled={!userAnswer}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-xl"
                >
                  <Sword className="w-6 h-6 mr-2" />
                  Hujum Qilish
                </Button>
              ) : (
                <Button 
                  onClick={nextProblem}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-xl"
                >
                  Keyingi Masala
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Game Stats */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{gameStats.correctAnswers}</div>
                <div className="text-sm text-gray-300">To'g'ri</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{gameStats.wrongAnswers}</div>
                <div className="text-sm text-gray-300">Noto'g'ri</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{gameStats.currentProblem}</div>
                <div className="text-sm text-gray-300">Masala</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
