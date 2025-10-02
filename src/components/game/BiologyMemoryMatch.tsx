import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  RotateCcw,
  Trophy,
  Brain,
  Shuffle
} from "lucide-react";

interface MemoryCard {
  id: number;
  content: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface BiologyMemoryMatchProps {
  onLeave?: () => void;
}

export const BiologyMemoryMatch = ({ onLeave }: BiologyMemoryMatchProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check for game completion whenever cards are updated
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setTimeout(() => {
        setGameState('finished');
      }, 500);
    }
  }, [cards]);

  // Biology term pairs in Uzbek
  const biologyPairs = [
    { term: "Yadro", definition: "DNK saqlanadigan qism" },
    { term: "Mitoxondriya", definition: "Energiya ishlab chiqaradi" },
    { term: "Ribosoma", definition: "Oqsil sintez qiladi" }
  ];

  const initializeCards = () => {
    const newCards: MemoryCard[] = [];
    let id = 0;

    // Create cards for each pair
    biologyPairs.forEach((pair, pairIndex) => {
      // Add term card
      newCards.push({
        id: id++,
        content: pair.term,
        pairId: pairIndex,
        isFlipped: false,
        isMatched: false
      });
      
      // Add definition card
      newCards.push({
        id: id++,
        content: pair.definition,
        pairId: pairIndex,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle the cards
    const shuffledCards = newCards.sort(() => Math.random() - 0.5);
    return shuffledCards;
  };

  const startGame = () => {
    setGameState('playing');
    setCards(initializeCards());
    setFlippedCards([]);
    setMoves(0);
    setIsProcessing(false);
  };

  const handleCardClick = (cardId: number) => {
    if (isProcessing || flippedCards.length >= 2) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card state
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    // If two cards are flipped, check for match
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      setIsProcessing(true);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found!
        setTimeout(() => {
          setCards(prev => {
            const updatedCards = prev.map(c => 
              c.id === firstId || c.id === secondId 
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            );
            
            // Check if all pairs are matched after updating
            const allMatched = updatedCards.every(c => c.isMatched);
            
            if (allMatched) {
              setTimeout(() => {
                setGameState('finished');
              }, 500);
            }
            
            return updatedCards;
          });
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      } else {
        // No match - flip cards back
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  const restartGame = () => {
    setGameState('menu');
  };

  const allMatched = cards.length > 0 && cards.every(card => card.isMatched);

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 p-8 relative">
        {/* Leave button */}
        {onLeave && (
          <Button 
            onClick={onLeave}
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 bg-green-600/20 border-green-500 text-green-300 hover:bg-green-600/30 hover:text-white hover:border-green-400"
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
            <div className="text-8xl mb-6">🧠</div>
            <h1 className="text-6xl font-bold text-white mb-4">Xotira O'yini</h1>
            <p className="text-xl text-gray-300">Biologiya atamalarini yodlang!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-green-800/50 border-green-700">
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">6 Karta</h3>
                <p className="text-gray-300">3 juftlik</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-800/50 border-green-700">
              <CardContent className="p-6 text-center">
                <Shuffle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Harakatlar</h3>
                <p className="text-gray-300">Kamroq harakatda toping</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-800/50 border-green-700">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Xotira</h3>
                <p className="text-gray-300">Xotira qobiliyatini rivojlantiring</p>
              </CardContent>
            </Card>
          </div>

          <Button 
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-16 py-6 text-2xl"
          >
            <Brain className="w-8 h-8 mr-3" />
            Boshlash
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <div className="text-8xl mb-6">🎉</div>
            <h1 className="text-6xl font-bold text-white mb-4">
              Tabriklaymiz!
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Siz barcha kartalarni topdingiz!
            </p>
            <p className="text-lg text-gray-400">
              Jami harakatlar: {moves}
            </p>
          </motion.div>

          <Card className="bg-green-800/50 border-green-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Yakuniy Natijalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">{moves}</div>
                  <div className="text-gray-300">Harakatlar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">3</div>
                  <div className="text-gray-300">Juftliklar</div>
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 p-4 relative">
      {/* Leave button */}
      {onLeave && (
        <Button 
          onClick={onLeave}
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 bg-green-600/20 border-green-500 text-green-300 hover:bg-green-600/30 hover:text-white hover:border-green-400 z-10"
        >
          <Home className="w-4 h-4 mr-1" />
          Chiqish
        </Button>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <Badge variant="outline" className="text-white border-green-600">
              <Brain className="w-4 h-4 mr-1" />
              Harakatlar: {moves}
            </Badge>
            <Badge variant="outline" className="text-white border-green-600">
              <Trophy className="w-4 h-4 mr-1" />
              Juftliklar: {cards.filter(c => c.isMatched).length / 2}/3
            </Badge>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Xotira O'yini</h1>
          <p className="text-lg text-gray-300">Biologiya atamalarini juftlikka qo'shing</p>
        </div>

        {/* Memory Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`
                  h-32 cursor-pointer transition-all duration-300
                  ${card.isMatched 
                    ? 'bg-green-600 border-green-500' 
                    : card.isFlipped 
                      ? 'bg-blue-600 border-blue-500' 
                      : 'bg-green-800 border-green-700 hover:bg-green-700'
                  }
                  ${isProcessing && flippedCards.includes(card.id) ? 'pointer-events-none' : ''}
                `}
                onClick={() => handleCardClick(card.id)}
              >
                <CardContent className="h-full flex items-center justify-center p-4">
                  <motion.div
                    className="text-center"
                    animate={{
                      rotateY: card.isFlipped || card.isMatched ? 0 : 180
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white font-medium text-sm text-center leading-tight"
                      >
                        {card.content}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-300 text-2xl"
                      >
                        🧬
                      </motion.div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-lg">
            {flippedCards.length === 0 && "Kartani tanlang va juftlikka qo'shing"}
            {flippedCards.length === 1 && "Yana bir kartani tanlang"}
            {flippedCards.length === 2 && isProcessing && "Tekshirilmoqda..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BiologyMemoryMatch;
