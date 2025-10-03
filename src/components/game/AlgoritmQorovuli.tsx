import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sword, Heart, Trophy, Skull, Zap, Target } from "lucide-react";

interface AlgoritmQorovuliProps {
  onLeave?: (successRate?: number) => void;
}

interface BattleScenario {
  id: number;
  scenario: string;
  description: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const battleScenarios: BattleScenario[] = [
  {
    id: 1,
    scenario: "Bubble Swap",
    description: "Guardian [3, 1, 2] massivini chiqaradi va \"Birinchi qadamni tanlang!\" deydi.",
    options: ["Swap (3,1)", "Swap (2,1)", "Swap (1,2)", "Hech qaysi"],
    correctAnswer: 0,
    explanation: "Bubble Sort birinchi qadamda 3 va 1 ni solishtiradi va ularni almashtiradi."
  },
  {
    id: 2,
    scenario: "Merge Slam",
    description: "Guardian ikkita blokni urib yuborishga tayyorlanadi.",
    options: ["Block (to'g'ri)", "Attack", "Defend", "Escape"],
    correctAnswer: 0,
    explanation: "Merge algoritmida bloklarni birlashtirish to'g'ri strategiya."
  },
  {
    id: 3,
    scenario: "Divide & Conquer",
    description: "Guardian o'zini ikkiga bo'lib, kichik minionlarga aylanadi.",
    options: ["Divide & Conquer (to'g'ri)", "Oddiy hujum", "To'liq mudofaa", "Retreat"],
    correctAnswer: 0,
    explanation: "Divide & Conquer strategiyasi katta muammoni kichik qismlarga bo'lib hal qilish."
  },
  {
    id: 4,
    scenario: "Sorting Trap",
    description: "Guardian [5, 2, 4, 1] massivini illyuziya sifatida chiqaradi. \"Birlamchi swap nima bo'ladi?\"",
    options: ["Swap (5,2)", "Swap (4,1)", "Swap (2,4)", "Hech qaysi"],
    correctAnswer: 0,
    explanation: "Insertion Sort birinchi qadamda 5 va 2 ni almashtiradi."
  },
  {
    id: 5,
    scenario: "Binary Strike",
    description: "Guardian massivni yarimga bo'lib hujum qilishga tayyorlanadi.",
    options: ["Binary Search", "Linear Attack", "Random Strike", "Full Assault"],
    correctAnswer: 0,
    explanation: "Binary Search massivni yarimga bo'lib qidirish algoritmi."
  },
  {
    id: 6,
    scenario: "Stack Defense",
    description: "Guardian LIFO printsipida hujum qiladi.",
    options: ["Stack Strategy", "Queue Defense", "Array Block", "List Shield"],
    correctAnswer: 0,
    explanation: "Stack LIFO (Last In, First Out) printsipiga asoslanadi."
  },
  {
    id: 7,
    scenario: "Quick Sort Fury",
    description: "Guardian tez-tez pivot tanlab hujum qiladi.",
    options: ["Pivot Strike", "Random Attack", "Sequential Hit", "Parallel Blow"],
    correctAnswer: 0,
    explanation: "Quicksort pivot elementni tanlab massivni bo'lish algoritmi."
  },
  {
    id: 8,
    scenario: "Fibonacci Combo",
    description: "Guardian oldingi hujumlar yig'indisini hisoblab zarba beradi.",
    options: ["F(n) = F(n-1) + F(n-2)", "F(n) = F(n-1) - F(n-2)", "F(n) = 2 * F(n-1)", "F(n) = n^2"],
    correctAnswer: 0,
    explanation: "Fibonacci sonlari oldingi ikkita sonning yig'indisiga teng."
  }
];

export const AlgoritmQorovuli: React.FC<AlgoritmQorovuliProps> = ({ onLeave }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'victory' | 'defeat'>('menu');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  
  // HP states
  const [playerHP, setPlayerHP] = useState(30);
  const [bossHP, setBossHP] = useState(50);
  
  // Animation states
  const [bossHurt, setBossHurt] = useState(false);
  const [playerHurt, setPlayerHurt] = useState(false);

  const currentScenario = battleScenarios[currentQuestionIndex];
  const maxPlayerHP = 30;
  const maxBossHP = 50;

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowFeedback(false);
    setPlayerHP(30);
    setBossHP(50);
  };

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const correct = answerIndex === currentScenario.correctAnswer;
    setIsCorrect(correct);
    
    let newBossHP = bossHP;
    let newPlayerHP = playerHP;
    
    if (correct) {
      // Player hits boss
      newBossHP = Math.max(0, bossHP - 10);
      setBossHP(newBossHP);
      setFeedbackMessage("Zo'r! To'g'ri algoritm qo'lladingiz, boss zarba oldi!");
      setBossHurt(true);
      setTimeout(() => setBossHurt(false), 1000);
    } else {
      // Boss hits player
      newPlayerHP = Math.max(0, playerHP - 5);
      setPlayerHP(newPlayerHP);
      setFeedbackMessage("Xato! Guardian sizga zarba berdi!");
      setPlayerHurt(true);
      setTimeout(() => setPlayerHurt(false), 1000);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (newBossHP <= 0 || newPlayerHP <= 0) {
        // Game ends
        if (newBossHP <= 0) {
          setGameState('victory');
        } else {
          setGameState('defeat');
        }
      } else {
        // Next question
        nextQuestion();
      }
    }, 2000);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => (prev + 1) % battleScenarios.length);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowFeedback(false);
  };

  const getHPBarColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage > 60) return "bg-green-500";
    if (percentage > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 via-purple-900 to-purple-700 p-8 relative">
        {/* Leave button */}
        {onLeave && (
          <Button 
            onClick={() => onLeave()}
            variant="outline"
            size="sm"
            className="fixed top-4 left-4 bg-red-600/20 border-red-500 text-red-300 hover:bg-red-600/30 hover:text-white hover:border-red-400 z-50 shadow-lg"
          >
            <Shield className="w-4 h-4 mr-1" />
            Chiqish
          </Button>
        )}
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 mt-16"
          >
            <div className="text-8xl mb-6">🏰</div>
            <h1 className="text-6xl font-bold text-white mb-4">Algoritm Guardian</h1>
            <p className="text-xl text-gray-300">Qadimiy qo'riqchi bilan jang qiling!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-red-800/50 border-red-700">
              <CardContent className="p-6 text-center">
                <Sword className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">O'yinchi HP: 30</h3>
                <p className="text-gray-300">Algoritm bilimlari</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-800/50 border-red-700">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Boss HP: 50</h3>
                <p className="text-gray-300">Algoritm Guardian</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-800/50 border-red-700">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">8 Jang</h3>
                <p className="text-gray-300">Algoritm stsenariylari</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white px-20 py-8 text-3xl md:px-24 md:py-10 md:text-4xl"
            >
              <Zap className="w-8 h-8 mr-3" />
              Jangni Boshlash
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'victory') {
    const successRate = Math.round(((maxBossHP - bossHP) / maxBossHP) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 via-purple-900 to-purple-700 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-4">
              🎉 Tabriklaymiz!
            </h1>
            <p className="text-2xl text-green-300 mb-4">
              Algoritm Guardian ustidan g'alaba qozondingiz!
            </p>
            <p className="text-lg text-gray-300">
              Siz algoritm bilimlaringizni namoyish etdingiz!
            </p>
          </motion.div>

          <Card className="bg-red-800/50 border-red-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Jang Natijalari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">{playerHP}</div>
                  <div className="text-gray-300">Qolgan HP</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">{successRate}%</div>
                  <div className="text-gray-300">Muvaffaqiyat</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">🏆</div>
                  <div className="text-gray-300">G'olib</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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
                <Trophy className="w-6 h-6 mr-2" />
                Keyingi level
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'defeat') {
    const successRate = Math.round(((maxBossHP - bossHP) / maxBossHP) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 via-purple-900 to-purple-700 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Skull className="w-32 h-32 text-red-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-4">
              💀 Mag'lub bo'ldingiz!
            </h1>
            <p className="text-2xl text-red-300 mb-4">
              Mag'lub bo'ldingiz…
            </p>
            <p className="text-lg text-gray-300">
              Algoritmni o'rganib, qayta urinib ko'ring!
            </p>
          </motion.div>

          <Card className="bg-red-800/50 border-red-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Jang Natijalari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400">{playerHP}</div>
                  <div className="text-gray-300">Qolgan HP</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">{successRate}%</div>
                  <div className="text-gray-300">Muvaffaqiyat</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400">💀</div>
                  <div className="text-gray-300">Mag'lubiyat</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
            >
              <Sword className="w-6 h-6 mr-2" />
              Qaytadan urinish
            </Button>
            
            {onLeave && (
              <Button 
                onClick={() => onLeave(successRate)}
                size="lg"
                className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700"
              >
                <Shield className="w-6 h-6 mr-2" />
                Xaritaga qaytish
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-purple-900 to-purple-700 p-4 relative">
      {/* Leave button */}
      {onLeave && (
        <Button 
          onClick={() => onLeave()}
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 bg-red-600/20 border-red-500 text-red-300 hover:bg-red-600/30 hover:text-white hover:border-red-400 z-50 shadow-lg"
        >
          <Shield className="w-4 h-4 mr-1" />
          Chiqish
        </Button>
      )}

      {/* HP Bars */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player HP */}
          <motion.div
            animate={playerHurt ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="bg-red-800/50 rounded-lg p-4 border border-red-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sword className="w-6 h-6 text-red-400" />
              <span className="text-white font-bold">O'yinchi</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <motion.div
                className={`h-4 rounded-full transition-all duration-500 ${getHPBarColor(playerHP, maxPlayerHP)}`}
                style={{ width: `${(playerHP / maxPlayerHP) * 100}%` }}
                animate={playerHurt ? { backgroundColor: "#ef4444" } : {}}
              />
            </div>
            <div className="text-white text-sm mt-1">HP: {playerHP}/{maxPlayerHP}</div>
          </motion.div>

          {/* Boss HP */}
          <motion.div
            animate={bossHurt ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="bg-red-800/50 rounded-lg p-4 border border-red-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-white font-bold">Algoritm Guardian</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <motion.div
                className={`h-4 rounded-full transition-all duration-500 ${getHPBarColor(bossHP, maxBossHP)}`}
                style={{ width: `${(bossHP / maxBossHP) * 100}%` }}
                animate={bossHurt ? { backgroundColor: "#ef4444" } : {}}
              />
            </div>
            <div className="text-white text-sm mt-1">HP: {bossHP}/{maxBossHP}</div>
          </motion.div>
        </div>
      </div>

      {/* Battle Scenario */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-red-800/50 border-red-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              Algoritm Guardian Aytadi:
            </CardTitle>
            <p className="text-gray-300 text-lg mt-2">"{currentScenario.description}"</p>
            <p className="text-white text-lg font-bold mt-2">{currentScenario.scenario} strategiyasini tanlang:</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentScenario.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentScenario.correctAnswer;
                const showResult = isAnswered && isSelected;
                
                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    variant="outline"
                    className={`
                      h-auto p-4 text-left justify-start text-base font-medium transition-all
                      border-2 hover:scale-[1.02] bg-red-700/50 border-red-600 text-white
                      ${!isAnswered && "hover:border-red-400 hover:bg-red-600/50"}
                      ${showResult && isCorrect && "border-green-500 bg-green-500/20 text-green-400"}
                      ${showResult && !isCorrect && "border-red-500 bg-red-500/20 text-red-400"}
                      ${isAnswered && !isSelected && isCorrect && "border-green-500 bg-green-500/10 text-green-400"}
                    `}
                  >
                    <span className={`
                      mr-3 flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-sm shrink-0
                      ${showResult && isCorrect && "border-green-500 bg-green-500/30"}
                      ${showResult && !isCorrect && "border-red-500 bg-red-500/30"}
                      ${isAnswered && !isSelected && isCorrect && "border-green-500 bg-green-500/20"}
                      ${!showResult && "border-slate-500/30"}
                    `}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="break-words">{option}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-6"
            >
              <Card className={`${isCorrect ? 'bg-green-800/50 border-green-700' : 'bg-red-800/50 border-red-700'}`}>
                <CardContent className="p-4">
                  <p className={`text-lg font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '✅' : '❌'} {feedbackMessage}
                  </p>
                   {isAnswered && (
                     <p className="text-gray-300 text-sm mt-2">
                       {currentScenario.explanation}
                     </p>
                   )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AlgoritmQorovuli;