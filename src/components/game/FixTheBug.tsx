import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  RotateCcw,
  Trophy,
  Code,
  Bug,
  CheckCircle,
  XCircle
} from "lucide-react";

interface BugCode {
  id: number;
  brokenCode: string;
  correctCode: string;
  description: string;
  hint: string;
}

interface FixTheBugProps {
  onLeave?: (successRate?: number) => void;
}

export const FixTheBug = ({ onLeave }: FixTheBugProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentBugIndex, setCurrentBugIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [bugsFixed, setBugsFixed] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // 5 broken code snippets in Uzbek context
  const bugCodes: BugCode[] = [
    {
      id: 1,
      brokenCode: 'prnt("Salom")',
      correctCode: 'print("Salom")',
      description: "print funksiyasida xatolik bor",
      hint: "print so'zida 'i' harfi yo'q. To'liq so'zni yozing."
    },
    {
      id: 2,
      brokenCode: 'for i in raange(5):',
      correctCode: 'for i in range(5):',
      description: "range funksiyasida xatolik bor",
      hint: "range so'zida 'a' harfi ortiqcha. To'g'ri yozing."
    },
    {
      id: 3,
      brokenCode: 'if x = 5:',
      correctCode: 'if x == 5:',
      description: "tenglik tekshirishda xatolik bor",
      hint: "Tenglik tekshirish uchun '=' o'rniga '==' ishlatiladi."
    },
    {
      id: 4,
      brokenCode: 'pritn(2 + )',
      correctCode: 'print(2 + 2)',
      description: "print funksiyasi va matematik ifodada xatolik bor",
      hint: "print so'zida 'i' harfi yo'q va matematik ifoda to'liq emas."
    },
    {
      id: 5,
      brokenCode: 'def salom print("Hi")',
      correctCode: 'def salom(): print("Hi")',
      description: "funksiya ta'rifida xatolik bor",
      hint: "Funksiya ta'rifida ':' belgisi va qavslar '()' kerak."
    }
  ];

  const startGame = () => {
    setGameState('playing');
    setCurrentBugIndex(0);
    setUserInput('');
    setScore(0);
    setShowResult(false);
    setIsCorrect(false);
    setBugsFixed(0);
    setShowHint(false);
  };

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const currentBug = bugCodes[currentBugIndex];
    const isAnswerCorrect = userInput.trim() === currentBug.correctCode;
    
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
      setBugsFixed(prev => prev + 1);
    }

    // Move to next bug after showing result
    setTimeout(() => {
      if (currentBugIndex < bugCodes.length - 1) {
        setCurrentBugIndex(prev => prev + 1);
        setUserInput('');
        setShowResult(false);
        setIsCorrect(false);
        setShowHint(false);
      } else {
        // All bugs completed
        setGameState('finished');
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const restartGame = () => {
    setGameState('menu');
  };

  const currentBug = bugCodes[currentBugIndex];

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 p-8 relative">
        {/* Leave button */}
        {onLeave && (
          <Button 
            onClick={onLeave}
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
                scale: [1, 1.2, 1],
                rotate: [0, 12, -12, 0],
                y: [0, -8, 0]
              }}
              transition={{ 
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🐛
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">Xatolikni Tuzatish</h1>
            <p className="text-xl text-gray-300">Kod xatolarini toping va tuzating!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-purple-800/50 border-purple-700">
              <CardContent className="p-6 text-center">
                <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">5 Xatolik</h3>
                <p className="text-gray-300">Python kod misollari</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-800/50 border-purple-700">
              <CardContent className="p-6 text-center">
                <Bug className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Xatolik Topish</h3>
                <p className="text-gray-300">Kod xatolarini aniqlang</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-800/50 border-purple-700">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Tuzatish</h3>
                <p className="text-gray-300">To'g'ri kodni yozing</p>
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
    const percentage = Math.round((score / bugCodes.length) * 100);
    
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
              Siz barcha xatoliklarni tuzatdingiz!
            </p>
            <p className="text-lg text-gray-400">
              Tuzatilgan xatoliklar: {bugsFixed}/{bugCodes.length}
            </p>
          </motion.div>

          <Card className="bg-purple-800/50 border-purple-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Yakuniy Natijalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">{bugsFixed}</div>
                  <div className="text-gray-300">Tuzatilgan Xatoliklar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">{bugCodes.length}</div>
                  <div className="text-gray-300">Jami Xatoliklar</div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 p-2 sm:p-4 relative">
      {/* Leave button */}
      {onLeave && (
        <Button 
          onClick={onLeave}
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
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Badge variant="outline" className="text-white border-purple-600 text-sm">
              <Bug className="w-4 h-4 mr-1" />
              Xatolik: {currentBugIndex + 1}/{bugCodes.length}
            </Badge>
            <Badge variant="outline" className="text-white border-purple-600 text-sm">
              <Trophy className="w-4 h-4 mr-1" />
              Tuzatilgan: {bugsFixed}
            </Badge>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">Xatolikni Tuzatish</h1>
          <p className="text-base sm:text-lg text-gray-300">Kod xatolarini toping va to'g'ri kodni yozing</p>
        </div>

        {/* Bug Code Display */}
        <motion.div
          key={currentBugIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="bg-purple-800/50 border-purple-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center mb-4">
                Xatolik #{currentBugIndex + 1}
              </CardTitle>
              <div className="text-lg text-gray-300 text-center mb-4">
                <p className="font-medium">Xatolik haqida:</p>
                <p className="italic">{currentBug.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Xatolikli kod:
                </h3>
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border-2 border-red-500">
                  <code className="text-red-300 text-lg sm:text-xl font-mono break-all">
                    {currentBug.brokenCode}
                  </code>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  To'g'ri kodni yozing:
                </h3>
                
                {/* Clear instruction with arrow pointing to input */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500 rounded-lg px-4 py-2">
                    <span className="text-blue-300 text-lg">⬇️</span>
                    <span className="text-blue-200 font-semibold">Bu yerga javobingizni yozing</span>
                  </div>
                </div>

                {/* Input area - better mobile layout */}
                <div className="space-y-4">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Bu yerga to'g'ri kodni yozing..."
                    className="w-full text-lg font-mono bg-gray-900 border-2 border-purple-500 text-white placeholder-gray-400 h-14 px-4 text-center"
                    disabled={showResult}
                  />
                  
                  {/* Buttons in mobile-friendly layout */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleSubmit}
                      disabled={!userInput.trim() || showResult}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg font-semibold"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Javobni Yuborish
                    </Button>
                    <Button
                      onClick={() => setShowHint(!showHint)}
                      variant="outline"
                      className="flex-1 sm:flex-none border-yellow-500 text-yellow-300 hover:bg-yellow-500/20 hover:text-yellow-200 h-12 text-lg"
                    >
                      💡 {showHint ? 'Maslahatni Yashirish' : 'Maslahat Ko\'rish'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hint Display */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <Card className="bg-yellow-800/30 border-yellow-500">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">💡</div>
                        <div>
                          <h4 className="text-lg font-bold text-yellow-200 mb-2">Maslahat:</h4>
                          <p className="text-yellow-100">{currentBug.hint}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
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
                    {isCorrect ? "To'g'ri! Kod ishladi." : "Xato. Qaytadan urinib ko'ring."}
                  </h3>
                  {!isCorrect && (
                    <div className="text-gray-300 text-lg">
                      <p className="mb-2">To'g'ri javob:</p>
                      <code className="bg-gray-800 px-3 py-2 rounded text-green-300 font-mono">
                        {currentBug.correctCode}
                      </code>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-lg">
            {!showResult && "Kod xatolarini toping va to'g'ri kodni yozing"}
            {showResult && isCorrect && "Ajoyib! Keyingi xatolikka o'tamiz..."}
            {showResult && !isCorrect && "Qaytadan urinib ko'ring..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FixTheBug;
