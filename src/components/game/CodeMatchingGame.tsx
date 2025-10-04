'use client'

import React, { useState, useEffect } from "react";
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
  ArrowRight,
  Shuffle
} from "lucide-react";

interface RoundData {
  id: number;
  codes: { id: number; code: string; correctResult: string }[];
  results: string[];
}

interface CodeMatchingGameProps {
  onLeave?: (successRate?: number) => void;
}

export const CodeMatchingGame = ({ onLeave }: CodeMatchingGameProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedCode, setSelectedCode] = useState<{ id: number; code: string; correctResult: string } | null>(null);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  // 5 rounds with 2 codes and 2 results each (only 1 correct match per round)
  const rounds: RoundData[] = [
    {
      id: 1,
      codes: [
        { id: 1, code: "print(2 + 2)", correctResult: "4" },
        { id: 2, code: "print(3 * 3)", correctResult: "9" }
      ],
      results: ["4", "8"] // Only "4" is correct for first code
    },
    {
      id: 2,
      codes: [
        { id: 3, code: "print(\"Salom\".upper())", correctResult: "SALOM" },
        { id: 4, code: "print(\"Hi\".lower())", correctResult: "hi" }
      ],
      results: ["SALOM", "HI"] // Only "SALOM" is correct for first code
    },
    {
      id: 3,
      codes: [
        { id: 5, code: "print(len([1, 2, 3]))", correctResult: "3" },
        { id: 6, code: "print(len([1, 2]))", correctResult: "2" }
      ],
      results: ["3", "4"] // Only "3" is correct for first code
    },
    {
      id: 4,
      codes: [
        { id: 7, code: "print(\"Hi\" * 3)", correctResult: "HiHiHi" },
        { id: 8, code: "print(\"A\" * 2)", correctResult: "AA" }
      ],
      results: ["HiHiHi", "HiHi"] // Only "HiHiHi" is correct for first code
    },
    {
      id: 5,
      codes: [
        { id: 9, code: "print(7 % 3)", correctResult: "1" },
        { id: 10, code: "print(8 % 3)", correctResult: "2" }
      ],
      results: ["1", "3"] // Only "1" is correct for first code
    }
  ];

  const [currentRoundData, setCurrentRoundData] = useState<RoundData | null>(null);

  const startGame = () => {
    setGameState('playing');
    setCurrentRound(0);
    setScore(0);
    setSelectedCode(null);
    setSelectedResult(null);
    setShowResult(false);
    setIsCorrect(false);
    setMatchedPairs([]);
    setCurrentRoundData(rounds[0]);
  };

  const handleCodeSelect = (code: { id: number; code: string; correctResult: string }) => {
    if (showResult || matchedPairs.includes(code.id)) return;
    
    setSelectedCode(code);
    
    if (selectedResult) {
      checkMatch(code, selectedResult);
    }
  };

  const handleResultSelect = (result: string) => {
    if (showResult) return;
    
    setSelectedResult(result);
    
    if (selectedCode) {
      checkMatch(selectedCode, result);
    }
  };

  const checkMatch = (code: { id: number; code: string; correctResult: string }, result: string) => {
    const correct = code.correctResult === result;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 1);
      setMatchedPairs(prev => [...prev, code.id]);
    }
  };

  const nextRound = () => {
    if (currentRound < rounds.length - 1) {
      // Move to next round
      const nextRoundIndex = currentRound + 1;
      setCurrentRound(nextRoundIndex);
      setCurrentRoundData(rounds[nextRoundIndex]);
      setSelectedCode(null);
      setSelectedResult(null);
      setShowResult(false);
      setIsCorrect(false);
      setMatchedPairs([]);
    } else {
      setGameState('finished');
    }
  };

  const restartGame = () => {
    setGameState('menu');
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 p-8 relative">
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
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔗
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">Kod → Natija Moslashtirish</h1>
            <p className="text-xl text-gray-300">Python kodlarini to'g'ri natijalari bilan bog'lang!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-blue-800/50 border-blue-700">
              <CardContent className="p-6 text-center">
                <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">5 Raund</h3>
                <p className="text-gray-300">Har raundda 2 ta kod</p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-800/50 border-blue-700">
              <CardContent className="p-6 text-center">
                <Shuffle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">2 Variant</h3>
                <p className="text-gray-300">Faqat 1 tasi to'g'ri</p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-800/50 border-blue-700">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Moslashtirish</h3>
                <p className="text-gray-300">Kodni to'g'ri natija bilan bog'lang</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-20 py-8 text-3xl md:px-24 md:py-10 md:text-4xl"
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
    const totalPossible = rounds.length; // 1 correct match per round = 5 total
    const percentage = Math.round((score / totalPossible) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 p-8">
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
              To'g'ri moslashtirishlar: {score}/{totalPossible}
            </p>
          </motion.div>

          <Card className="bg-blue-800/50 border-blue-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Yakuniy Natijalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">{score}</div>
                  <div className="text-gray-300">To'g'ri Moslashtirishlar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">{totalPossible}</div>
                  <div className="text-gray-300">Jami Moslashtirishlar</div>
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
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 p-4 relative">
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

      <div className="max-w-6xl mx-auto">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <Badge variant="outline" className="text-white border-blue-600">
              <Code className="w-4 h-4 mr-1" />
              Raund: {currentRound + 1}/5
            </Badge>
            <Badge variant="outline" className="text-white border-blue-600">
              <Trophy className="w-4 h-4 mr-1" />
              Ball: {score}
            </Badge>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Kod → Natija Moslashtirish</h1>
          <p className="text-lg text-gray-300">Python kodlarini to'g'ri natijalari bilan bog'lang</p>
        </div>

        {/* Code Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Kodlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRoundData?.codes.map((codePair) => (
              <motion.div
                key={codePair.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    matchedPairs.includes(codePair.id) 
                      ? 'bg-green-800/50 border-green-500 opacity-50' 
                      : selectedCode?.id === codePair.id
                      ? 'bg-blue-600/50 border-blue-400'
                      : 'bg-blue-800/50 border-blue-700 hover:bg-blue-700/50'
                  } ${matchedPairs.includes(codePair.id) ? 'cursor-not-allowed' : ''}`}
                  onClick={() => handleCodeSelect(codePair)}
                >
                  <CardContent className="p-4">
                    <div className="font-mono text-lg text-white text-center">
                      {codePair.code}
                    </div>
                    {matchedPairs.includes(codePair.id) && (
                      <div className="text-center mt-2">
                        <CheckCircle className="w-6 h-6 text-green-400 mx-auto" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Result Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Natijalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRoundData?.results.map((result, index) => (
              <motion.div
                key={`${result}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedResult === result
                      ? 'bg-purple-600/50 border-purple-400'
                      : 'bg-purple-800/50 border-purple-700 hover:bg-purple-700/50'
                  }`}
                  onClick={() => handleResultSelect(result)}
                >
                  <CardContent className="p-4">
                    <div className="font-mono text-lg text-white text-center">
                      {result}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

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
                    {isCorrect 
                      ? "Ajoyib! Kod va natija to'g'ri mos keladi." 
                      : "Afsus! Bu kod va natija mos kelmaydi. Qaytadan urinib ko'ring."
                    }
                  </p>
                  <Button 
                    onClick={nextRound}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <ArrowRight className="w-6 h-6 mr-2" />
                    {currentRound < rounds.length - 1 ? "Keyingi raund" : "Natijalarni ko'rish"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-lg">
            {!showResult && "Kodni tanlang, keyin uning natijasini tanlang"}
            {showResult && isCorrect && "Ajoyib! Keyingi raundga o'tamiz..."}
            {showResult && !isCorrect && "Qaytadan urinib ko'ring..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeMatchingGame;
