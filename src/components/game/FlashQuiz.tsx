import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Home, 
  Play, 
  RotateCcw,
  CheckCircle,
  XCircle,
  Trophy
} from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface FlashQuizProps {
  onLeave?: () => void;
}

export const FlashQuiz = ({ onLeave }: FlashQuizProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  // Sample math questions in Uzbek - 8 questions total
  const questions: QuizQuestion[] = [
    {
      question: "2 + 2 = ?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1
    },
    {
      question: "5 × 3 = ?",
      options: ["12", "15", "18", "20"],
      correctAnswer: 1
    },
    {
      question: "12 ÷ 4 = ?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1
    },
    {
      question: "8 - 3 = ?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1
    },
    {
      question: "7 + 6 = ?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 2
    },
    {
      question: "9 × 2 = ?",
      options: ["16", "18", "20", "22"],
      correctAnswer: 1
    },
    {
      question: "15 - 7 = ?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2
    },
    {
      question: "6 + 9 = ?",
      options: ["14", "15", "16", "17"],
      correctAnswer: 1
    }
  ];

  // Timer effect - 20 seconds total for all questions
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeLeft === 0) {
      // Time's up - finish the game
      setGameState('finished');
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setQuestionsAnswered(0);
  };

  const handleAnswer = useCallback((answerIndex: number) => {
    if (showResult) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = answerIndex === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowResult(true);
    setQuestionsAnswered(prev => prev + 1);

    if (correct) {
      setScore(prev => prev + 1);
    }

    // Move to next question immediately (no delay since we have limited time)
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setIsCorrect(false);
      } else {
        // Game finished
        setGameState('finished');
      }
    }, 500); // Short delay to show the result briefly
  }, [currentQuestionIndex, questions, showResult]);

  const restartGame = () => {
    setGameState('menu');
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 relative">
        {/* Leave button */}
        {onLeave && (
          <Button 
            onClick={onLeave}
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 bg-blue-600/20 border-blue-500 text-blue-300 hover:bg-blue-600/30 hover:text-white hover:border-blue-400"
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
            <div className="text-8xl mb-6">⚡</div>
            <h1 className="text-6xl font-bold text-white mb-4">Flash Quiz</h1>
            <p className="text-xl text-gray-300">Matematik savollar bilan tezlik sinovi!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">20 Soniya</h3>
                <p className="text-gray-300">Barcha savollar uchun vaqt</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">8 Savol</h3>
                <p className="text-gray-300">Matematik masalalar</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Tez Javob</h3>
                <p className="text-gray-300">To'g'ri javob berish</p>
              </CardContent>
            </Card>
          </div>

          <Button 
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-16 py-6 text-2xl"
          >
            <Play className="w-8 h-8 mr-3" />
            Boshlash
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / questions.length) * 100);
    
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
              Quiz Tugadi!
            </h1>
            <p className="text-xl text-gray-300">
              Siz {score} ta savoldan to'g'ri javob berdingiz!
            </p>
          </motion.div>

          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Yakuniy Natijalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">{score}</div>
                  <div className="text-gray-300">To'g'ri Javoblar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">{questions.length}</div>
                  <div className="text-gray-300">Jami Savollar</div>
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
                onClick={onLeave}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Home className="w-6 h-6 mr-2" />
                Chiqish
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
          onClick={onLeave}
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 bg-blue-600/20 border-blue-500 text-blue-300 hover:bg-blue-600/30 hover:text-white hover:border-blue-400 z-10"
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
              <Clock className="w-4 h-4 mr-1" />
              Vaqt: {timeLeft}s
            </Badge>
            <Badge variant="outline" className="text-white border-slate-600">
              Savol: {currentQuestionIndex + 1}/{questions.length}
            </Badge>
            <Badge variant="outline" className="text-white border-slate-600">
              <Trophy className="w-4 h-4 mr-1" />
              Ball: {score}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress 
            value={((currentQuestionIndex + 1) / questions.length) * 100} 
            className="h-3"
          />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-3xl text-center">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`
                        w-full h-16 text-xl font-bold
                        ${showResult 
                          ? index === currentQuestion.correctAnswer 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : selectedAnswer === index 
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-slate-600 hover:bg-slate-700 text-gray-300'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                        }
                        transition-all duration-200
                      `}
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Result Display */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <Card className={`${isCorrect ? 'bg-green-800/50 border-green-500' : 'bg-red-800/50 border-red-500'} border-2`}>
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">
                    {isCorrect ? '✅' : '❌'}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isCorrect ? "To'g'ri!" : "Noto'g'ri!"}
                  </h3>
                  <p className="text-gray-300">
                    {isCorrect 
                      ? "Ajoyib! To'g'ri javob berdingiz!" 
                      : `To'g'ri javob: ${currentQuestion.options[currentQuestion.correctAnswer]}`
                    }
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timer Visual */}
        <div className="mt-6">
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-slate-700"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 35}`}
                  strokeDashoffset={`${2 * Math.PI * 35 * (1 - timeLeft / 20)}`}
                  className={`transition-all duration-1000 ${
                    timeLeft > 10 ? 'text-green-500' : 
                    timeLeft > 5 ? 'text-yellow-500' : 'text-red-500'
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{timeLeft}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashQuiz;
