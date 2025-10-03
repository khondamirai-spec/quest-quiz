import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  RotateCcw,
  Trophy,
  Code,
  CheckCircle,
  XCircle,
  ArrowRight
} from "lucide-react";

interface TrueFalseQuestion {
  id: number;
  question: string;
  isTrue: boolean;
  explanation: string;
}

interface TrueFalseCodeGameProps {
  onLeave?: (successRate?: number) => void;
}

export const TrueFalseCodeGame = ({ onLeave }: TrueFalseCodeGameProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 5 Python programming questions in Uzbek
  const questions: TrueFalseQuestion[] = [
    {
      id: 1,
      question: "Python'da funksiya 'def' kalit so'zi bilan e'lon qilinadi.",
      isTrue: true,
      explanation: "To'g'ri! Python'da funksiyalar 'def' kalit so'zi bilan e'lon qilinadi. Misol: def salom():"
    },
    {
      id: 2,
      question: "Python'da kodni ajratish uchun {} qavs ishlatiladi.",
      isTrue: false,
      explanation: "Noto'g'ri! Python'da kodni ajratish uchun {} qavs emas, balki indentatsiya (bo'shliq) ishlatiladi."
    },
    {
      id: 3,
      question: "print() funksiyasi ekranga matn chiqaradi.",
      isTrue: true,
      explanation: "To'g'ri! print() funksiyasi ekranga matn, raqam yoki boshqa ma'lumotlarni chiqaradi."
    },
    {
      id: 4,
      question: "Python'da 'int' satr (string) ma'lumot turini bildiradi.",
      isTrue: false,
      explanation: "Noto'g'ri! 'int' butun son ma'lumot turini bildiradi. Satr uchun 'str' ishlatiladi."
    },
    {
      id: 5,
      question: "Python'da vergul (,) o'rniga nuqta (.) bilan ro'yxat ajratiladi.",
      isTrue: false,
      explanation: "Noto'g'ri! Python'da ro'yxat elementlari vergul (,) bilan ajratiladi, nuqta (.) emas."
    }
  ];

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleAnswer = (answer: boolean) => {
    if (showResult) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = answer === currentQuestion.isTrue;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    } else {
      setGameState('finished');
    }
  };

  const restartGame = () => {
    setGameState('menu');
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 p-8 relative">
        {/* Leave button */}
        {onLeave && (
          <Button 
            onClick={() => onLeave()}
            variant="outline"
            size="sm"
            className="fixed top-4 left-4 bg-purple-600/20 border-purple-500 text-purple-300 hover:bg-purple-600/30 hover:text-white hover:border-purple-400 z-50 shadow-lg"
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
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🧠
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">To'g'ri yoki Noto'g'ri</h1>
            <p className="text-xl text-gray-300">Python dasturlash bilimlarini sinab ko'ring!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-purple-800/50 border-purple-700">
              <CardContent className="p-6 text-center">
                <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">5 Savol</h3>
                <p className="text-gray-300">Python dasturlash asoslari</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-800/50 border-purple-700">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">To'g'ri/Noto'g'ri</h3>
                <p className="text-gray-300">Oddiy tanlov o'yini</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-800/50 border-purple-700">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Bilim</h3>
                <p className="text-gray-300">Dasturlash bilimlarini tekshiring</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-20 py-8 text-3xl md:px-24 md:py-10 md:text-4xl"
            >
              <Code className="w-8 h-8 mr-3" />
              Boshlash
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-4">
              Tabriklaymiz!
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              O'yin tugadi!
            </p>
            <p className="text-lg text-gray-400">
              To'g'ri javoblar: {score}/{questions.length}
            </p>
          </motion.div>

          <Card className="bg-purple-800/50 border-purple-700 mb-8">
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
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Qaytadan o'ynash
            </Button>
            
            {onLeave && (
              <Button 
                onClick={() => onLeave(percentage)}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 p-4 relative">
      {/* Leave button */}
      {onLeave && (
        <Button 
          onClick={() => onLeave()}
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 bg-purple-600/20 border-purple-500 text-purple-300 hover:bg-purple-600/30 hover:text-white hover:border-purple-400 z-50 shadow-lg"
        >
          <Home className="w-4 h-4 mr-1" />
          Chiqish
        </Button>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <Badge variant="outline" className="text-white border-purple-600">
              <Code className="w-4 h-4 mr-1" />
              Savol: {currentQuestionIndex + 1}/{questions.length}
            </Badge>
            <Badge variant="outline" className="text-white border-purple-600">
              <Trophy className="w-4 h-4 mr-1" />
              Ball: {score}
            </Badge>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">To'g'ri yoki Noto'g'ri</h1>
          <p className="text-lg text-gray-300">Python dasturlash bilimlarini tekshiring</p>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="bg-purple-800/50 border-purple-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center mb-4">
                Savol #{currentQuestionIndex + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-6 text-center leading-relaxed">
                  {currentQuestion.question}
                </h3>
                
                {!showResult && (
                  <div className="flex gap-6 justify-center">
                    <Button
                      onClick={() => handleAnswer(true)}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-xl"
                    >
                      <CheckCircle className="w-6 h-6 mr-3" />
                      ✅ To'g'ri
                    </Button>
                    <Button
                      onClick={() => handleAnswer(false)}
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl"
                    >
                      <XCircle className="w-6 h-6 mr-3" />
                      ❌ Noto'g'ri
                    </Button>
                  </div>
                )}
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
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {isCorrect ? "To'g'ri!" : "Noto'g'ri!"}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {currentQuestion.explanation}
                  </p>
                  <Button 
                    onClick={nextQuestion}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <ArrowRight className="w-6 h-6 mr-2" />
                    {currentQuestionIndex < questions.length - 1 ? "Keyingi savol" : "Natijalarni ko'rish"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-lg">
            {!showResult && "Savolga javob berish uchun tugmalardan birini tanlang"}
            {showResult && isCorrect && "Ajoyib! Keyingi savolga o'tamiz..."}
            {showResult && !isCorrect && "Qaytadan urinib ko'ring..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseCodeGame;
