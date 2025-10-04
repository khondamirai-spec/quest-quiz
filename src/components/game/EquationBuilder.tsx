'use client'

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calculator, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Home,
  Trophy,
  Clock,
  Play,
  Target
} from "lucide-react";

interface Equation {
  id: number;
  template: string;
  correctOperators: string[];
  result: number;
  explanation: string;
}

interface GameStats {
  currentRound: number;
  totalRounds: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
}

const EQUATIONS: Equation[] = [
  {
    id: 1,
    template: "3 _ 2 _ 4 = 11",
    correctOperators: ["+", "×"],
    result: 11,
    explanation: "3 + (2 × 4) = 3 + 8 = 11"
  },
  {
    id: 2,
    template: "5 _ 6 _ 2 = 13",
    correctOperators: ["+", "+"],
    result: 13,
    explanation: "(5 + 6) + 2 = 11 + 2 = 13"
  },
  {
    id: 3,
    template: "10 _ 3 _ 1 = 6",
    correctOperators: ["−", "−"],
    result: 6,
    explanation: "10 − 3 − 1 = 7 − 1 = 6"
  },
  {
    id: 4,
    template: "8 _ 2 _ 2 = 12",
    correctOperators: ["+", "×"],
    result: 12,
    explanation: "8 + (2 × 2) = 8 + 4 = 12"
  },
  {
    id: 5,
    template: "7 _ 4 _ 2 = 15",
    correctOperators: ["+", "×"],
    result: 15,
    explanation: "7 + (4 × 2) = 7 + 8 = 15"
  }
];

const OPERATORS = ["+", "−", "×", "÷"];

interface EquationBuilderProps {
  onLeave?: (successRate?: number) => void;
}

export const EquationBuilder = ({ onLeave }: EquationBuilderProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [gameStats, setGameStats] = useState<GameStats>({
    currentRound: 1,
    totalRounds: 5,
    correctAnswers: 0,
    wrongAnswers: 0,
    score: 0
  });

  const [currentEquation, setCurrentEquation] = useState<Equation>(EQUATIONS[0]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [availableOperators, setAvailableOperators] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [draggedOperator, setDraggedOperator] = useState<string | null>(null);

  // Initialize game
  useEffect(() => {
    if (gameState === 'playing') {
      initializeRound();
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setGameStats({
      currentRound: 1,
      totalRounds: 5,
      correctAnswers: 0,
      wrongAnswers: 0,
      score: 0
    });
    setGameCompleted(false);
    initializeRound();
  };

  const initializeRound = () => {
    const equation = EQUATIONS[gameStats.currentRound - 1];
    setCurrentEquation(equation);
    setSelectedOperators([]);
    setAvailableOperators([...OPERATORS].sort(() => Math.random() - 0.5));
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowResult(false);
  };

  const handleDragStart = (operator: string) => {
    setDraggedOperator(operator);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    if (!draggedOperator || selectedOperators[position]) return;

    const newSelectedOperators = [...selectedOperators];
    newSelectedOperators[position] = draggedOperator;
    setSelectedOperators(newSelectedOperators);

    // Don't remove the operator from available operators - keep it available for reuse
    setDraggedOperator(null);
  };

  const removeOperator = (position: number) => {
    const operator = selectedOperators[position];
    if (!operator) return;

    const newSelectedOperators = [...selectedOperators];
    newSelectedOperators[position] = "";
    setSelectedOperators(newSelectedOperators);

    // No need to add back to available operators since they're always available
  };

  const checkAnswer = () => {
    const isAnswerCorrect = selectedOperators.every((op, index) => 
      op === currentEquation.correctOperators[index]
    );

    setIsCorrect(isAnswerCorrect);
    setIsSubmitted(true);
    setShowResult(true);

    if (isAnswerCorrect) {
      setGameStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        score: prev.score + 100
      }));
    } else {
      setGameStats(prev => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1
      }));
    }
  };

  const nextRound = () => {
    if (gameStats.currentRound < gameStats.totalRounds) {
      setGameStats(prev => ({
        ...prev,
        currentRound: prev.currentRound + 1
      }));
      initializeRound();
    } else {
      setGameCompleted(true);
      setGameState('completed');
      // Calculate success rate and call onLeave
      const successRate = (gameStats.correctAnswers / gameStats.totalRounds) * 100;
      if (onLeave) {
        onLeave(successRate);
      }
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setGameStats({
      currentRound: 1,
      totalRounds: 5,
      correctAnswers: 0,
      wrongAnswers: 0,
      score: 0
    });
    setGameCompleted(false);
  };

  const renderEquation = () => {
    const parts = currentEquation.template.split('_');
    return (
      <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-white">
        <span>{parts[0]}</span>
        <div 
          className="w-16 h-16 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 0)}
        >
          {selectedOperators[0] && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-blue-300 cursor-pointer hover:text-blue-200"
              onClick={() => removeOperator(0)}
            >
              {selectedOperators[0]}
            </motion.span>
          )}
        </div>
        <span>{parts[1]}</span>
        <div 
          className="w-16 h-16 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 1)}
        >
          {selectedOperators[1] && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-blue-300 cursor-pointer hover:text-blue-200"
              onClick={() => removeOperator(1)}
            >
              {selectedOperators[1]}
            </motion.span>
          )}
        </div>
        <span>{parts[2]}</span>
      </div>
    );
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 relative">
        {/* Leave button */}
        {onLeave && (
          <Button 
            onClick={() => onLeave()}
            variant="outline"
            size="sm"
            className="fixed top-4 left-4 bg-blue-600/20 border-blue-500 text-blue-300 hover:bg-blue-600/30 hover:text-white hover:border-blue-400 z-50 shadow-lg"
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
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🧮
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">Tenglama Yig'uvchi</h1>
            <p className="text-xl text-gray-300">Operatorlarni joylashtirib tenglama tuzing!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">5 Raund</h3>
                <p className="text-gray-300">Tenglama yig'ish</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Calculator className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Drag & Drop</h3>
                <p className="text-gray-300">Operatorlarni sudrab joylashtiring</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Matematika</h3>
                <p className="text-gray-300">Arifmetik amallar</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-20 py-8 text-3xl md:px-24 md:py-10 md:text-4xl"
            >
              <Play className="w-8 h-8 mr-3" />
              Boshlash
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const percentage = Math.round((gameStats.correctAnswers / gameStats.totalRounds) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-4">
              O'yin Tugadi!
            </h1>
            <p className="text-xl text-gray-300">
              Siz {gameStats.correctAnswers} ta tenglamani to'g'ri yechdingiz!
            </p>
          </motion.div>

          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Yakuniy Natijalar</CardTitle>
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
                  <div className="text-4xl font-bold text-yellow-400">{percentage}%</div>
                  <div className="text-gray-300">Natija</div>
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
              <RotateCcw className="w-6 h-6 mr-2" />
              Qaytadan o'ynash
            </Button>
            
            {onLeave && (
              <Button 
                onClick={() => onLeave(percentage)}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative">
      {/* Leave button */}
      {onLeave && (
        <Button 
          onClick={() => onLeave()}
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 bg-blue-600/20 border-blue-500 text-blue-300 hover:bg-blue-600/30 hover:text-white hover:border-blue-400 z-50 shadow-lg"
        >
          <Home className="w-4 h-4 mr-1" />
          Chiqish
        </Button>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Badge variant="outline" className="text-white border-slate-600">
              <Target className="w-4 h-4 mr-1" />
              Raund: {gameStats.currentRound}/{gameStats.totalRounds}
            </Badge>
            <Badge variant="outline" className="text-white border-slate-600">
              <Trophy className="w-4 h-4 mr-1" />
              Ball: {gameStats.score}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress 
            value={(gameStats.currentRound / gameStats.totalRounds) * 100} 
            className="h-3"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Equation Area */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                <span>Tenglama Tuzing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-lg text-gray-300 mb-4">
                  Operatorlarni drag & drop orqali joylashtiring
                </div>
                {renderEquation()}
              </div>

              {showResult && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`p-4 rounded-lg text-center border-2 ${
                    isCorrect ? 'bg-green-800/50 border-green-500' : 'bg-red-800/50 border-red-500'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 mr-2" />
                    )}
                    <span className={`font-bold text-lg ${
                      isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isCorrect ? "To'g'ri javob!" : "Xato, qayta urinib ko'ring."}
                    </span>
                  </div>
                  {isCorrect && (
                    <div className="text-sm text-gray-300 mt-2">
                      {currentEquation.explanation}
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex justify-center">
                {!isSubmitted ? (
                  <Button 
                    onClick={checkAnswer}
                    disabled={selectedOperators.some(op => !op)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Tekshirish
                  </Button>
                ) : (
                  <Button onClick={nextRound} className="w-full bg-green-600 hover:bg-green-700">
                    Keyingi Raund
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Operators Area */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Operatorlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {availableOperators.map((operator, index) => (
                  <motion.div
                    key={`${operator}-${index}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    draggable
                    onDragStart={() => handleDragStart(operator)}
                    className="w-full h-16 bg-blue-600/20 border-2 border-blue-500 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-blue-600/30 transition-colors"
                  >
                    <span className="text-2xl font-bold text-blue-300">
                      {operator}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-300">
                Operatorlarni yuqoridagi bo'sh joylarga sudrab tashlang
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Stats */}
        <Card className="mt-8 bg-slate-800/50 border-slate-700">
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
                <div className="text-2xl font-bold text-blue-400">{gameStats.score}</div>
                <div className="text-sm text-gray-300">Ball</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EquationBuilder;