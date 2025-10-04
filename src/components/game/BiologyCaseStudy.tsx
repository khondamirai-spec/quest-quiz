'use client'

import React, { useState } from "react";
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
  BookOpen,
  Microscope
} from "lucide-react";

interface BiologyScenario {
  id: string;
  title: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface BiologyCaseStudyProps {
  onLeave?: (successRate?: number) => void;
}

export const BiologyCaseStudy = ({ onLeave }: BiologyCaseStudyProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 5 Biology scenarios in Uzbek language
  const scenarios: BiologyScenario[] = [
    {
      id: "cell1",
      title: "Hujayra Tuzilishi",
      scenario: "Siz mikroskop ostida hujayrani kuzatyapsiz. Hujayra ichida ko'p sonli kichik organellalar ko'rinadi. Ulardan biri hujayra uchun energiya ishlab chiqaradi.",
      question: "Hujayra uchun energiya ishlab chiqaruvchi organella qaysi?",
      options: [
        "Yadro (Nucleus)",
        "Mitoxondriya (Mitochondria)", 
        "Ribosoma (Ribosome)",
        "Xloroplast (Chloroplast)"
      ],
      correctAnswer: 1,
      explanation: "Mitoxondriya hujayraning 'energiya zavodi' hisoblanadi. U ATP (adenozin trifosfat) molekulasini ishlab chiqaradi, bu hujayra uchun asosiy energiya manbai."
    },
    {
      id: "photosynthesis1",
      title: "Fotosintez Jarayoni",
      scenario: "O'simlik bargida yashil rangli pigment mavjud. Bu pigment quyosh nurini yutadi va uni kimyoviy energiyaga aylantiradi. Bu jarayon o'simliklar uchun oziq-ovqat tayyorlashning asosiy usuli.",
      question: "O'simliklarda quyosh nurini yutuvchi yashil pigment qaysi?",
      options: [
        "Karotinoid (Carotenoid)",
        "Xlorofil (Chlorophyll)",
        "Antosianin (Anthocyanin)",
        "Ksantofil (Xanthophyll)"
      ],
      correctAnswer: 1,
      explanation: "Xlorofil o'simliklardagi asosiy yashil pigment bo'lib, fotosintez jarayonida quyosh nurini yutadi va uni kimyoviy energiyaga aylantiradi."
    },
    {
      id: "digestion1",
      title: "Ovqat Hazm Qilish",
      scenario: "Ovqat hazm qilish jarayonida oziq-ovqat moddalari kichik molekulalarga parchalanishi kerak. Bu jarayon turli fermentlar yordamida amalga oshiriladi.",
      question: "Oqsil (protein) hazm qilishda qaysi ferment ishtirok etadi?",
      options: [
        "Amilaza (Amylase)",
        "Lipaza (Lipase)",
        "Pepsin (Pepsin)",
        "Sukraza (Sucrase)"
      ],
      correctAnswer: 2,
      explanation: "Pepsin oqsil hazm qilishda ishtirok etuvchi asosiy ferment bo'lib, oqsil molekulalarini kichik peptidlarga parchalaydi."
    },
    {
      id: "circulation1",
      title: "Qon Aylanish Tizimi",
      scenario: "Qon aylanish tizimida yurak qonni butun tanaga pompalaydi. Qon oqsimon va qizil qon hujayralarini o'z ichiga oladi va kislorodni barcha organlarga yetkazadi.",
      question: "Qizil qon hujayralarida qaysi modda kislorodni tashiydi?",
      options: [
        "Plazma (Plasma)",
        "Gemoglobin (Hemoglobin)",
        "Trombotsit (Platelet)",
        "Leukotsit (White blood cell)"
      ],
      correctAnswer: 1,
      explanation: "Gemoglobin qizil qon hujayralaridagi temir oqsimon bo'lib, kislorodni o'pkadan barcha organlarga tashishda asosiy rol o'ynaydi."
    },
    {
      id: "nervous1",
      title: "Asab Tizimi",
      scenario: "Asab tizimi orqali miyadan barcha organlarga signal uzatiladi. Bu signallar asab hujayralari orqali tez tarqaladi va organizmning barcha qismlarini boshqaradi.",
      question: "Asab hujayrasining asosiy qismi qaysi?",
      options: [
        "Akson (Axon)",
        "Dendrit (Dendrite)",
        "Neuron (Neuron)",
        "Sinaps (Synapse)"
      ],
      correctAnswer: 2,
      explanation: "Neuron asab tizimining asosiy funksional birligi bo'lib, elektr va kimyoviy signallarni uzatishda ishtirok etadi."
    }
  ];

  const startGame = () => {
    setGameState('playing');
    setCurrentScenarioIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    const currentScenario = scenarios[currentScenarioIndex];
    const correct = answerIndex === currentScenario.correctAnswer;
    
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
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

  const currentScenario = scenarios[currentScenarioIndex];

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 p-8 relative">
        {/* Leave button */}
        {onLeave && (
          <Button 
            onClick={() => onLeave()}
            variant="outline"
            size="sm"
            className="fixed top-4 left-4 bg-green-600/20 border-green-500 text-green-300 hover:bg-green-600/30 hover:text-white hover:border-green-400 z-50 shadow-lg"
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
                scale: [1, 1.15, 1],
                rotate: [0, 8, -8, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🧬
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">Biologiya Tadqiqoti</h1>
            <p className="text-xl text-gray-300">Biologiya ssenariylari bilan o'rganing!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-green-800/50 border-green-700">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">5 Ssenariy</h3>
                <p className="text-gray-300">Biologiya masalalari</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-800/50 border-green-700">
              <CardContent className="p-6 text-center">
                <Microscope className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Tadqiqot</h3>
                <p className="text-gray-300">Ilmiy yondashuv</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-800/50 border-green-700">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Tushuntirish</h3>
                <p className="text-gray-300">Batafsil izohlar</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-20 py-8 text-3xl md:px-24 md:py-10 md:text-4xl"
            >
              <Play className="w-8 h-8 mr-3" />
              Boshlash
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / scenarios.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-4">
              Tadqiqot Tugadi!
            </h1>
            <p className="text-xl text-gray-300">
              Siz {score} ta ssenariydan to'g'ri javob berdingiz!
            </p>
          </motion.div>

          <Card className="bg-green-800/50 border-green-700 mb-8">
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
                  <div className="text-4xl font-bold text-blue-400">{scenarios.length}</div>
                  <div className="text-gray-300">Jami Ssenariylar</div>
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
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 p-4 relative">
      {/* Leave button */}
      {onLeave && (
        <Button 
          onClick={() => onLeave()}
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 bg-green-600/20 border-green-500 text-green-300 hover:bg-green-600/30 hover:text-white hover:border-green-400 z-50 shadow-lg"
        >
          <Home className="w-4 h-4 mr-1" />
          Chiqish
        </Button>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Badge variant="outline" className="text-white border-green-600">
              Ssenariy: {currentScenarioIndex + 1}/{scenarios.length}
            </Badge>
            <Badge variant="outline" className="text-white border-green-600">
              <Trophy className="w-4 h-4 mr-1" />
              Ball: {score}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress 
            value={((currentScenarioIndex + 1) / scenarios.length) * 100} 
            className="h-3"
          />
        </div>

        {/* Scenario Card */}
        <motion.div
          key={currentScenarioIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="bg-green-800/50 border-green-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center mb-4">
                {currentScenario.title}
              </CardTitle>
              <div className="text-lg text-gray-300 leading-relaxed">
                <p className="mb-4 font-medium">Ssenariy:</p>
                <p className="italic">{currentScenario.scenario}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {currentScenario.question}
                </h3>
                <div className="grid gap-3">
                  {currentScenario.options.map((option, index) => (
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
                            ? index === currentScenario.correctAnswer 
                              ? 'bg-green-600 hover:bg-green-700 text-white' 
                              : selectedAnswer === index 
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-green-600/30 hover:bg-green-600/30 text-gray-300'
                            : 'bg-green-700 hover:bg-green-600 text-white'
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
                    {isCorrect ? "To'g'ri!" : "Noto'g'ri"}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {currentScenario.explanation}
                  </p>
                  <Button 
                    onClick={nextScenario}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Keyingi savol
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BiologyCaseStudy;
