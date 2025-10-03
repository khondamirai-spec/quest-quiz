import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  RotateCcw,
  Trophy,
  Microscope,
  CheckCircle,
  XCircle,
  ArrowRight,
  Shuffle
} from "lucide-react";

interface Concept {
  id: number;
  text: string;
  correctCategory: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  borderColor: string;
}

interface BiologySortingGameProps {
  onLeave?: (successRate?: number) => void;
}

export const BiologySortingGame = ({ onLeave }: BiologySortingGameProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [matchedConcepts, setMatchedConcepts] = useState<number[]>([]);
  const [conceptsInCategories, setConceptsInCategories] = useState<{[key: string]: Concept[]}>({});
  const [roundComplete, setRoundComplete] = useState(false);

  // 3 rounds with different biology topics
  const rounds = [
    {
      id: 1,
      title: "Prokariot vs Eukariot",
      categories: [
        { id: "prokaryote", name: "Prokariot", color: "bg-blue-800/50", borderColor: "border-blue-500" },
        { id: "eukaryote", name: "Eukariot", color: "bg-green-800/50", borderColor: "border-green-500" }
      ],
      concepts: [
        { id: 1, text: "Bakteriya", correctCategory: "prokaryote" },
        { id: 2, text: "Hayvon hujayrasi", correctCategory: "eukaryote" },
        { id: 3, text: "Arxaebakteriya", correctCategory: "prokaryote" },
        { id: 4, text: "O'simlik hujayrasi", correctCategory: "eukaryote" }
      ]
    },
    {
      id: 2,
      title: "O'simlik hujayrasi vs Hayvon hujayrasi",
      categories: [
        { id: "plant", name: "O'simlik hujayrasi", color: "bg-green-800/50", borderColor: "border-green-500" },
        { id: "animal", name: "Hayvon hujayrasi", color: "bg-red-800/50", borderColor: "border-red-500" }
      ],
      concepts: [
        { id: 5, text: "Xloroplast", correctCategory: "plant" },
        { id: 6, text: "Mitoxondriya", correctCategory: "animal" },
        { id: 7, text: "Sentriol", correctCategory: "animal" },
        { id: 8, text: "Vakuola", correctCategory: "plant" }
      ]
    },
    {
      id: 3,
      title: "DNK vs RNK",
      categories: [
        { id: "dna", name: "DNK", color: "bg-purple-800/50", borderColor: "border-purple-500" },
        { id: "rna", name: "RNK", color: "bg-orange-800/50", borderColor: "border-orange-500" }
      ],
      concepts: [
        { id: 9, text: "Ikki spiral", correctCategory: "dna" },
        { id: 10, text: "Bir spiral", correctCategory: "rna" },
        { id: 11, text: "Tayanch azot asosi — timin", correctCategory: "dna" },
        { id: 12, text: "Tayanch azot asosi — urasil", correctCategory: "rna" }
      ]
    }
  ];

  const [currentRoundData, setCurrentRoundData] = useState<any>(null);

  const startGame = () => {
    setGameState('playing');
    setCurrentRound(0);
    setScore(0);
    setSelectedConcept(null);
    setShowResult(false);
    setIsCorrect(false);
    setMatchedConcepts([]);
    setConceptsInCategories({});
    setRoundComplete(false);
    setCurrentRoundData(rounds[0]);
  };

  const handleConceptClick = (concept: Concept) => {
    if (showResult || matchedConcepts.includes(concept.id)) return;
    setSelectedConcept(concept);
  };

  const handleCategoryClick = (categoryId: string) => {
    if (!selectedConcept || showResult || roundComplete) return;

    const correct = selectedConcept.correctCategory === categoryId;
    
    if (correct) {
      setScore(prev => prev + 1);
      setMatchedConcepts(prev => [...prev, selectedConcept.id]);
      
      // Move concept to category
      setConceptsInCategories(prev => ({
        ...prev,
        [categoryId]: [...(prev[categoryId] || []), selectedConcept]
      }));

      // Check if all concepts are now matched correctly
      const newMatchedConcepts = [...matchedConcepts, selectedConcept.id];
      const allConceptsMatched = currentRoundData?.concepts.every(concept => 
        newMatchedConcepts.includes(concept.id)
      );

      if (allConceptsMatched) {
        // All cards are placed correctly - show success
        setRoundComplete(true);
        setIsCorrect(true);
        setShowResult(true);
      } else {
        // Not all cards placed yet - just continue silently
        setSelectedConcept(null);
      }
    } else {
      // Wrong answer - show error immediately
      setIsCorrect(false);
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
      }, 2000);
    }

    setSelectedConcept(null);
  };

  const nextRound = () => {
    if (currentRound < rounds.length - 1) {
      const nextRoundIndex = currentRound + 1;
      setCurrentRound(nextRoundIndex);
      setCurrentRoundData(rounds[nextRoundIndex]);
      setSelectedConcept(null);
      setShowResult(false);
      setIsCorrect(false);
      setMatchedConcepts([]);
      setConceptsInCategories({});
      setRoundComplete(false);
    } else {
      setGameState('finished');
    }
  };

  const restartGame = () => {
    setGameState('menu');
  };

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
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🧬
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">Saralash O'yini</h1>
            <p className="text-xl text-gray-300">Biologiya tushunchalarini to'g'ri kategoriyalarga ajrating!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-green-800/50 border-green-700">
              <CardContent className="p-6 text-center">
                <Microscope className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">3 Raund</h3>
                <p className="text-gray-300">Har raundda 4 ta tushuncha</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-800/50 border-green-700">
              <CardContent className="p-6 text-center">
                <Shuffle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Saralash</h3>
                <p className="text-gray-300">Tushunchalarni kategoriyalarga ajrating</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-800/50 border-green-700">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Biologiya</h3>
                <p className="text-gray-300">Biologiya bilimlarini mustahkamlang</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-20 py-8 text-3xl md:px-24 md:py-10 md:text-4xl"
            >
              <Microscope className="w-8 h-8 mr-3" />
              Boshlash
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const totalPossible = rounds.length * 4; // 4 concepts per round
    const percentage = Math.round((score / totalPossible) * 100);
    
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
              Tabriklaymiz!
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              O'yin tugadi!
            </p>
            <p className="text-lg text-gray-400">
              To'g'ri saralashlar: {score}/{totalPossible}
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
                  <div className="text-gray-300">To'g'ri Saralashlar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">{totalPossible}</div>
                  <div className="text-gray-300">Jami Saralashlar</div>
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
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
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

      <div className="max-w-6xl mx-auto">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <Badge variant="outline" className="text-white border-green-600">
              <Microscope className="w-4 h-4 mr-1" />
              Raund: {currentRound + 1}/3
            </Badge>
            <Badge variant="outline" className="text-white border-green-600">
              <Trophy className="w-4 h-4 mr-1" />
              Ball: {score}
            </Badge>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Saralash O'yini</h1>
          <p className="text-lg text-gray-300">{currentRoundData?.title}</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentRoundData?.categories.map((category: any) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card 
                className={`${category.color} ${category.borderColor} border-2 transition-all duration-200 ${
                  roundComplete ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105'
                }`}
                onClick={() => !roundComplete && handleCategoryClick(category.id)}
              >
                <CardHeader>
                  <CardTitle className="text-white text-2xl text-center">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[120px] flex flex-col gap-2">
                    {conceptsInCategories[category.id]?.map((concept) => (
                      <div key={concept.id} className="bg-white/20 rounded-lg p-2 text-white text-center">
                        {concept.text}
                      </div>
                    ))}
                    {(!conceptsInCategories[category.id] || conceptsInCategories[category.id].length === 0) && (
                      <div className="text-gray-400 text-center py-8">
                        Tushunchalarni bu yerga tashlang
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Concepts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Tushunchalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentRoundData?.concepts.map((concept: Concept) => (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    matchedConcepts.includes(concept.id) 
                      ? 'bg-green-800/50 border-green-500 opacity-50' 
                      : selectedConcept?.id === concept.id
                      ? 'bg-blue-600/50 border-blue-400'
                      : 'bg-white/20 border-white/30 hover:bg-white/30'
                  } ${matchedConcepts.includes(concept.id) ? 'cursor-not-allowed' : ''}`}
                  onClick={() => handleConceptClick(concept)}
                >
                  <CardContent className="p-4">
                    <div className="text-white text-center font-medium">
                      {concept.text}
                    </div>
                    {matchedConcepts.includes(concept.id) && (
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
                    {isCorrect ? "Raund Tugadi!" : "Noto'g'ri!"}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {isCorrect
                      ? "Ajoyib! Barcha tushunchalar to'g'ri kategoriyalarga joylashtirildi!"
                      : "Afsus! Bu tushuncha noto'g'ri kategoriyaga joylashtirildi. Qaytadan urinib ko'ring!"
                    }
                  </p>
                  {roundComplete && (
                    <Button 
                      onClick={nextRound}
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <ArrowRight className="w-6 h-6 mr-2" />
                      {currentRound < rounds.length - 1 ? "Keyingi raund" : "Natijalarni ko'rish"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-lg">
            {!showResult && !roundComplete && `Barcha ${currentRoundData?.concepts.length} ta tushunchani to'g'ri kategoriyalarga joylashtiring`}
            {showResult && isCorrect && "Raund tugadi! Keyingi raundga o'tish uchun tugmani bosing"}
            {showResult && !isCorrect && "Noto'g'ri! Qaytadan urinib ko'ring..."}
          </p>
          {!showResult && !roundComplete && (
            <p className="text-gray-400 text-sm mt-2">
              Joylashtirilgan: {matchedConcepts.length}/{currentRoundData?.concepts.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiologySortingGame;
