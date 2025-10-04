'use client'

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Play, 
  RotateCcw,
  CheckCircle,
  XCircle,
  Trophy,
  Sword,
  Shield,
  Zap,
  Skull
} from "lucide-react";

interface BiologyQuestion {
  id: string;
  statement: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface MutantMonsterBattleProps {
  onLeave?: (successRate?: number) => void;
}

export const MutantMonsterBattle = ({ onLeave }: MutantMonsterBattleProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'victory' | 'defeat'>('menu');
  const [playerHP, setPlayerHP] = useState(30);
  const [bossHP, setBossHP] = useState(50);
  const [currentQuestion, setCurrentQuestion] = useState<BiologyQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [damageAnimation, setDamageAnimation] = useState<'none' | 'player' | 'boss'>('none');

  // Biology misconception questions in Uzbek
  const biologyQuestions: BiologyQuestion[] = [
    {
      id: "dna1",
      statement: "Mutant aytadi: \"DNKda Urasil bo'ladi.\"",
      options: [
        "To'g'ri",
        "Xato",
        "Ikkalasi ham",
        "Hech qaysi"
      ],
      correctAnswer: 1,
      explanation: "Urasil RNKda bo'ladi, DNKda Timin mavjud. Mutant xato gapirdi!"
    },
    {
      id: "ribosome1",
      statement: "Mutant aytadi: \"Ribosoma faqat eukariot hujayralarda mavjud.\"",
      options: [
        "To'g'ri",
        "Xato",
        "Faqat hayvonlarda",
        "Faqat o'simliklarda"
      ],
      correctAnswer: 1,
      explanation: "Ribosoma prokariot va eukariotlarda ham bor. Mutant noto'g'ri aytdi!"
    },
    {
      id: "chloroplast1",
      statement: "Mutant aytadi: \"Xloroplast hayvon hujayralarida bo'ladi.\"",
      options: [
        "To'g'ri",
        "Xato",
        "Faqat bakteriyalarda",
        "Faqat prokariotlarda"
      ],
      correctAnswer: 1,
      explanation: "Xloroplast faqat o'simlik hujayralarida bo'ladi. Mutant yana xato!"
    },
    {
      id: "mitochondria1",
      statement: "Mutant aytadi: \"Mitoxondriya hujayraning energiya ishlab chiqaruvchi organoidi emas.\"",
      options: [
        "To'g'ri",
        "Xato",
        "Faqat RNK ishlab chiqaradi",
        "Faqat yadro vazifasini bajaradi"
      ],
      correctAnswer: 1,
      explanation: "Mitoxondriya energiya ishlab chiqaruvchi organoid. Mutant noto'g'ri!"
    },
    {
      id: "dna2",
      statement: "Mutant aytadi: \"DNKning tuzilishi bir spiral.\"",
      options: [
        "To'g'ri",
        "Xato",
        "Uch spiral",
        "Halqa shakli"
      ],
      correctAnswer: 1,
      explanation: "DNK ikki spiral tuzilgan (double helix). Mutant yana xato gapirdi!"
    },
    {
      id: "protein1",
      statement: "Mutant aytadi: \"Oqsil faqat hayvonlardan olinadi.\"",
      options: [
        "To'g'ri",
        "Xato",
        "Faqat sut mahsulotlaridan",
        "Faqat go'shtdan"
      ],
      correctAnswer: 1,
      explanation: "Oqsil hayvon va o'simlik mahsulotlarida ham bor. Mutant xato!"
    },
    {
      id: "blood1",
      statement: "Mutant aytadi: \"Qon faqat qizil rangda bo'ladi.\"",
      options: [
        "To'g'ri",
        "Xato",
        "Faqat oqsimon",
        "Faqat ko'k"
      ],
      correctAnswer: 1,
      explanation: "Qon turli ranglarda bo'ladi: qizil, oqsimon va ko'k. Mutant noto'g'ri!"
    },
    {
      id: "brain1",
      statement: "Mutant aytadi: \"Miya faqat bosh suyagida joylashgan.\"",
      options: [
        "To'g'ri",
        "Xato",
        "Faqat orqa miyada",
        "Faqat qorin bo'shlig'ida"
      ],
      correctAnswer: 1,
      explanation: "Miya bosh suyagida, orqa miya esa umurtqa pog'onasida joylashgan. Mutant xato!"
    }
  ];

  const startGame = () => {
    setGameState('playing');
    setPlayerHP(30);
    setBossHP(50);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setIsAnimating(false);
    setDamageAnimation('none');
    pickRandomQuestion();
  };

  const pickRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * biologyQuestions.length);
    setCurrentQuestion(biologyQuestions[randomIndex]);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult || !currentQuestion) return;

    const correct = answerIndex === currentQuestion.correctAnswer;
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowResult(true);
    setIsAnimating(true);

    if (correct) {
      // Player hits boss
      setBossHP(prev => Math.max(0, prev - 10));
      setDamageAnimation('boss');
    } else {
      // Boss hits player
      setPlayerHP(prev => Math.max(0, prev - 5));
      setDamageAnimation('player');
    }

    // Check for game end
    setTimeout(() => {
      if (correct && bossHP <= 10) {
        setGameState('victory');
      } else if (!correct && playerHP <= 5) {
        setGameState('defeat');
      } else {
        // Continue to next question
        setShowResult(false);
        setIsAnimating(false);
        setDamageAnimation('none');
        setSelectedAnswer(null);
        pickRandomQuestion();
      }
    }, 3000);
  };

  const restartGame = () => {
    setGameState('menu');
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-red-900 p-8 relative">
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
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              👹
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">Mutant Monster Jang</h1>
            <p className="text-xl text-gray-300">Biologiya xatolarini tuzating va mutantni mag'lub qiling!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-red-800/50 border-red-700">
              <CardContent className="p-6 text-center">
                <Sword className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">O'yinchi HP: 30</h3>
                <p className="text-gray-300">Biologiya bilimlari</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-800/50 border-red-700">
              <CardContent className="p-6 text-center">
                <Skull className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Boss HP: 50</h3>
                <p className="text-gray-300">Mutant Monster</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-800/50 border-red-700">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">8 Savol</h3>
                <p className="text-gray-300">Biologiya xatolari</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white px-20 py-8 text-3xl md:px-24 md:py-10 md:text-4xl"
            >
              <Sword className="w-8 h-8 mr-3" />
              Jangni Boshlash
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'victory') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-yellow-900 to-green-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">
              Tabriklaymiz!
            </h1>
            <p className="text-2xl text-yellow-300 mb-4">
              Mutantni mag'lub qildingiz!
            </p>
            <p className="text-lg text-gray-300">
              Siz biologiya bilimlaringiz bilan mutant monsterini mag'lub qildingiz!
            </p>
          </motion.div>

          <Card className="bg-green-800/50 border-green-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Jang Natijasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">{playerHP}</div>
                  <div className="text-gray-300">O'yinchi HP</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400">0</div>
                  <div className="text-gray-300">Boss HP</div>
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
              <RotateCcw className="w-6 h-6 mr-2" />
              Qaytadan o'ynash
            </Button>
            
            {onLeave && (
              <Button 
                onClick={() => onLeave(100)}
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                x: [-10, 10, -10, 10, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mb-6"
            >
              💀
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">
              Mag'lub bo'ldingiz!
            </h1>
            <p className="text-2xl text-red-300 mb-4">
              Mutant sizni mag'lub qildi!
            </p>
            <p className="text-lg text-gray-300">
              Yana urinib ko'ring va biologiya bilimlaringizni mustahkamlang!
            </p>
          </motion.div>

          <Card className="bg-red-800/50 border-red-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Jang Natijasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400">0</div>
                  <div className="text-gray-300">O'yinchi HP</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400">{bossHP}</div>
                  <div className="text-gray-300">Boss HP</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Qaytadan urinish
            </Button>
            
            {onLeave && (
              <Button 
                onClick={() => onLeave(0)}
                size="lg"
                className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
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
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-red-900 p-4 relative">
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
        {/* HP Bars */}
        <div className="mb-8">
          {/* Boss HP Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Skull className="w-6 h-6 text-purple-400" />
                <span className="text-white font-bold text-lg">Mutant Monster</span>
              </div>
              <Badge variant="outline" className="text-white border-red-600">
                HP: {bossHP}/50
              </Badge>
            </div>
            <Progress 
              value={(bossHP / 50) * 100} 
              className="h-4 bg-gray-800"
            />
          </div>

          {/* Player HP Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-white font-bold text-lg">O'yinchi</span>
              </div>
              <Badge variant="outline" className="text-white border-green-600">
                HP: {playerHP}/30
              </Badge>
            </div>
            <Progress 
              value={(playerHP / 30) * 100} 
              className="h-4 bg-gray-800"
            />
          </div>
        </div>

        {/* Battle Arena */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monster Display */}
          <div className="flex justify-center items-center">
            <motion.div
              animate={damageAnimation === 'boss' ? {
                scale: [1, 1.1, 1],
                x: [-5, 5, -5, 5, 0],
                filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
              } : {}}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-9xl"
              >
                👹
              </motion.div>
              {damageAnimation === 'boss' && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -50 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-red-500 text-4xl font-bold"
                >
                  -10
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Player Display */}
          <div className="flex justify-center items-center">
            <motion.div
              animate={damageAnimation === 'player' ? {
                scale: [1, 0.95, 1],
                x: [-3, 3, -3, 3, 0],
                filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
              } : {}}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                  y: [0, -2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-9xl"
              >
                🛡️
              </motion.div>
              {damageAnimation === 'player' && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -50 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-red-500 text-4xl font-bold"
                >
                  -5
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-red-800/50 border-red-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center mb-4">
                  Mutant Aytadi:
                </CardTitle>
                <div className="text-lg text-gray-300 text-center bg-red-900/30 p-4 rounded-lg">
                  <p className="italic">"{currentQuestion.statement}"</p>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Bu to'g'ri yoki xato?
                </h3>
                <div className="grid gap-3">
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
                          w-full h-16 text-lg font-medium justify-start
                          ${showResult 
                            ? index === currentQuestion.correctAnswer 
                              ? 'bg-green-600 hover:bg-green-700 text-white' 
                              : selectedAnswer === index 
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-red-600/30 hover:bg-red-600/30 text-gray-300'
                            : 'bg-red-700 hover:bg-red-600 text-white'
                          }
                          transition-all duration-200
                        `}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Result Display */}
        <AnimatePresence>
          {showResult && currentQuestion && (
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
                    {isCorrect ? "To'g'ri! Mutantga zarba berdingiz!" : "Xato! Mutant sizga zarba berdi!"}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {currentQuestion.explanation}
                  </p>
                  <div className="text-lg text-yellow-300">
                    {isCorrect ? "Mutant -10 HP oldi!" : "Siz -5 HP oldingiz!"}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MutantMonsterBattle;
