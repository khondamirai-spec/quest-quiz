import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Zap, 
  Clock, 
  TrendingUp, 
  Calculator,
  Grid3X3,
  BarChart3,
  Trophy,
  Home
} from "lucide-react";

interface MathProblem {
  id: string;
  question: string;
  answer: string | number;
  type: 'algebra' | 'calculus' | 'matrix' | 'trigonometry' | 'statistics';
  difficulty: number;
  timeLimit: number;
  hint?: string;
}

interface Ship {
  id: number;
  name: string;
  size: number;
  positions: number[];
  sunk: boolean;
}

interface GridCell {
  row: number;
  col: number;
  claimed: boolean;
  owner: 'player' | 'computer' | null;
}

interface GameStats {
  correctAnswers: number;
  wrongAnswers: number;
  playerWins: number;
  computerWins: number;
  averageTime: number;
}

interface StrategicMathBattleshipProps {
  onLeave?: () => void;
}

export const StrategicMathBattleship = ({ onLeave }: StrategicMathBattleshipProps) => {
  const [gamePhase, setGamePhase] = useState<'menu' | 'instructions' | 'playing' | 'completed'>('menu');
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    correctAnswers: 0,
    wrongAnswers: 0,
    playerWins: 0,
    computerWins: 0,
    averageTime: 0
  });
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [maxQuestions] = useState(5);
  const [waitingForPlayerMove, setWaitingForPlayerMove] = useState(false);
  const [gameWinner, setGameWinner] = useState<'player' | 'computer' | 'draw' | null>(null);

  // Oddiy Matematik Masalalar (Uzbek)
  const mathProblems: MathProblem[] = [
    {
      id: 'math1',
      question: '7 + 8 = ?',
      answer: 15,
      type: 'algebra',
      difficulty: 1,
      timeLimit: 10
    },
    {
      id: 'math2',
      question: '12 × 3 = ?',
      answer: 36,
      type: 'algebra',
      difficulty: 1,
      timeLimit: 10
    },
    {
      id: 'math3',
      question: '45 ÷ 9 = ?',
      answer: 5,
      type: 'algebra',
      difficulty: 1,
      timeLimit: 10
    },
    {
      id: 'math4',
      question: '25 - 17 = ?',
      answer: 8,
      type: 'algebra',
      difficulty: 1,
      timeLimit: 10
    },
    {
      id: 'math5',
      question: '6² = ?',
      answer: 36,
      type: 'algebra',
      difficulty: 1,
      timeLimit: 10
    }
  ];

  // Initialize 3x3 grid
  useEffect(() => {
    const newGrid: GridCell[][] = [];
    for (let row = 0; row < 3; row++) {
      const gridRow: GridCell[] = [];
      for (let col = 0; col < 3; col++) {
        gridRow.push({
          row,
          col,
          claimed: false,
          owner: null
        });
      }
      newGrid.push(gridRow);
    }
    setGrid(newGrid);
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && gamePhase === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentProblem) {
      handleAnswer('');
    }
  }, [timeLeft, gamePhase, currentProblem]);

  const startGame = () => {
    setGamePhase('playing');
    setQuestionsAnswered(0);
    setGameWinner(null);
    setWaitingForPlayerMove(false);
    setGameStats({
      correctAnswers: 0,
      wrongAnswers: 0,
      playerWins: 0,
      computerWins: 0,
      averageTime: 0
    });
    // Reset grid
    const newGrid: GridCell[][] = [];
    for (let row = 0; row < 3; row++) {
      const gridRow: GridCell[] = [];
      for (let col = 0; col < 3; col++) {
        gridRow.push({
          row,
          col,
          claimed: false,
          owner: null
        });
      }
      newGrid.push(gridRow);
    }
    setGrid(newGrid);
    loadNextProblem();
  };

  const startActualGame = () => {
    setGamePhase('playing');
    setQuestionsAnswered(0);
    setGameWinner(null);
    setWaitingForPlayerMove(false);
    setGameStats({
      correctAnswers: 0,
      wrongAnswers: 0,
      playerWins: 0,
      computerWins: 0,
      averageTime: 0
    });
    // Reset grid
    const newGrid: GridCell[][] = [];
    for (let row = 0; row < 3; row++) {
      const gridRow: GridCell[] = [];
      for (let col = 0; col < 3; col++) {
        gridRow.push({
          row,
          col,
          claimed: false,
          owner: null
        });
      }
      newGrid.push(gridRow);
    }
    setGrid(newGrid);
    loadNextProblem();
  };

  const loadNextProblem = () => {
    if (questionsAnswered >= maxQuestions) {
      setGamePhase('completed');
      return;
    }
    
    const randomProblem = mathProblems[Math.floor(Math.random() * mathProblems.length)];
    setCurrentProblem(randomProblem);
    setTimeLeft(randomProblem.timeLimit);
    setUserAnswer('');
    setWaitingForPlayerMove(false);
  };

  // Check for win condition
  const checkWinCondition = (grid: GridCell[][]): 'player' | 'computer' | 'draw' | null => {
    // Check horizontal wins
    for (let row = 0; row < 3; row++) {
      if (grid[row][0].owner && grid[row][0].owner === grid[row][1].owner && grid[row][1].owner === grid[row][2].owner) {
        return grid[row][0].owner;
      }
    }

    // Check vertical wins
    for (let col = 0; col < 3; col++) {
      if (grid[0][col].owner && grid[0][col].owner === grid[1][col].owner && grid[1][col].owner === grid[2][col].owner) {
        return grid[0][col].owner;
      }
    }

    // Check diagonal wins
    if (grid[0][0].owner && grid[0][0].owner === grid[1][1].owner && grid[1][1].owner === grid[2][2].owner) {
      return grid[0][0].owner;
    }
    if (grid[0][2].owner && grid[0][2].owner === grid[1][1].owner && grid[1][1].owner === grid[2][0].owner) {
      return grid[0][2].owner;
    }

    // Check for draw (all squares filled)
    const allClaimed = grid.every(row => row.every(cell => cell.claimed));
    if (allClaimed) {
      return 'draw';
    }

    return null;
  };

  // Computer makes a random move
  const computerMove = () => {
    const emptyCells: {row: number, col: number}[] = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (!cell.claimed) {
          emptyCells.push({row: rowIndex, col: colIndex});
        }
      });
    });

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      setGrid(prev => {
        const newGrid = [...prev];
        newGrid[randomCell.row][randomCell.col] = {
          ...newGrid[randomCell.row][randomCell.col],
          claimed: true,
          owner: 'computer'
        };
        return newGrid;
      });
    }
  };

  const handleAnswer = useCallback((answer: string) => {
    if (!currentProblem) return;

    const isCorrect = checkAnswer(answer, currentProblem.answer);
    const solveTime = currentProblem.timeLimit - timeLeft;
    
    setQuestionsAnswered(prev => prev + 1);
    
    setGameStats(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
      averageTime: (prev.averageTime * (prev.correctAnswers + prev.wrongAnswers) + solveTime) / (prev.correctAnswers + prev.wrongAnswers + 1)
    }));

    if (isCorrect) {
      // Player gets to choose a square
      setWaitingForPlayerMove(true);
    } else {
      // Computer makes a move
      setTimeout(() => {
        computerMove();
        // Check for win after computer move
        setTimeout(() => {
          setGrid(currentGrid => {
            const winner = checkWinCondition(currentGrid);
            if (winner) {
              setGameWinner(winner);
              if (winner === 'computer') {
                setGameStats(prev => ({ ...prev, computerWins: prev.computerWins + 1 }));
              }
              setGamePhase('completed');
            }
            return currentGrid;
          });
        }, 500);
      }, 1000);
    }

    setTimeout(() => {
      if (!isCorrect) {
        loadNextProblem();
      }
    }, 1500);
  }, [currentProblem, timeLeft, grid]);

  // Handle player clicking on grid square
  const handleCellClick = (row: number, col: number) => {
    if (!waitingForPlayerMove || grid[row][col].claimed) return;

    setGrid(prev => {
      const newGrid = [...prev];
      newGrid[row][col] = {
        ...newGrid[row][col],
        claimed: true,
        owner: 'player'
      };
      return newGrid;
    });

    setWaitingForPlayerMove(false);

    // Check for win after player move
    setTimeout(() => {
      setGrid(currentGrid => {
        const winner = checkWinCondition(currentGrid);
        if (winner) {
          setGameWinner(winner);
          if (winner === 'player') {
            setGameStats(prev => ({ ...prev, playerWins: prev.playerWins + 1 }));
          }
          setGamePhase('completed');
        }
        return currentGrid;
      });
    }, 500);

    setTimeout(() => {
      if (!gameWinner) {
        loadNextProblem();
      }
    }, 1500);
  };

  const checkAnswer = (userAnswer: string, correctAnswer: string | number): boolean => {
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = correctAnswer.toString().toLowerCase();
    
    // Handle different answer formats
    if (typeof correctAnswer === 'number') {
      return parseFloat(normalizedUser) === correctAnswer;
    }
    
    return normalizedUser === normalizedCorrect;
  };

  const getProbabilityColor = (probability: number) => {
    if (probability > 0.7) return 'bg-red-500/30';
    if (probability > 0.5) return 'bg-orange-500/30';
    if (probability > 0.3) return 'bg-yellow-500/30';
    return 'bg-green-500/30';
  };

  const getProblemTypeIcon = (type: string) => {
    switch (type) {
      case 'algebra': return 'x²';
      case 'calculus': return '∫';
      case 'matrix': return '[ ]';
      case 'trigonometry': return 'sin';
      case 'statistics': return 'μ';
      default: return '?';
    }
  };

  // Simple fallback to ensure component renders
  if (!gamePhase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 flex items-center justify-center">
        <div className="text-white text-2xl">Matematik Jang O'yini Yuklanmoqda...</div>
      </div>
    );
  }

  if (gamePhase === 'menu') {
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
            <div className="text-8xl mb-6">🎯</div>
            <h1 className="text-6xl font-bold text-white mb-4">X-O O'yini</h1>
            <p className="text-xl text-gray-300">Matematik savollar bilan strategik jang!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-blue-800/50 border-blue-700">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">3x3 Grid</h3>
                <p className="text-gray-300">Strategik pozitsiya tanlash</p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-800/50 border-blue-700">
              <CardContent className="p-6 text-center">
                <Calculator className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">5 Savol</h3>
                <p className="text-gray-300">Matematik masalalar</p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-800/50 border-blue-700">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Strategiya</h3>
                <p className="text-gray-300">Aqlli harakatlar</p>
              </CardContent>
            </Card>
          </div>

          <Button 
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-16 py-6 text-2xl"
          >
            <Target className="w-8 h-8 mr-3" />
            Boshlash
          </Button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 relative">
        {/* Leave button in bottom-left corner */}
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 mt-16"
          >
            <h1 className="text-6xl font-bold text-white mb-4">Matematik X-O O'yini</h1>
            <p className="text-xl text-gray-300">Matematik masalalarni yechib 3 ta ketma-ket kvadrat yuting!</p>
          </motion.div>


          <div className="text-center">
            <Button 
              onClick={startActualGame}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-16 py-6 text-2xl"
            >
              <Zap className="w-8 h-8 mr-3" />
              O'yinni Boshlash
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'completed') {
    const getWinMessage = () => {
      if (gameWinner === 'player') {
        return {
          title: "Tabriklaymiz!",
          subtitle: "Siz yutdingiz! 3 ta ketma-ket kvadrat yutdingiz!",
          color: "text-green-400"
        };
      } else if (gameWinner === 'computer') {
        return {
          title: "Afsus!",
          subtitle: "Kompyuter yutdi! Keyingi safar yaxshiroq urinib ko'ring!",
          color: "text-red-400"
        };
      } else {
        return {
          title: "Durrang!",
          subtitle: "Hech kim yutmadi! Yaxshi kurash!",
          color: "text-yellow-400"
        };
      }
    };

    const winMsg = getWinMessage();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-4">{winMsg.title}</h1>
            <p className="text-xl text-gray-300">{winMsg.subtitle}</p>
          </motion.div>

          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Yakuniy Natijalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">{gameStats.correctAnswers}</div>
                  <div className="text-gray-300">To'g'ri Javoblar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400">{gameStats.wrongAnswers}</div>
                  <div className="text-gray-300">Noto'g'ri Javoblar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">{gameStats.playerWins}</div>
                  <div className="text-gray-300">O'yinchi G'alabasi</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400">{gameStats.computerWins}</div>
                  <div className="text-gray-300">Kompyuter G'alabasi</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => {
                setGamePhase('instructions');
                setGameStats({
                  correctAnswers: 0,
                  wrongAnswers: 0,
                  playerWins: 0,
                  computerWins: 0,
                  averageTime: 0
                });
                setQuestionsAnswered(0);
                setGameWinner(null);
                setWaitingForPlayerMove(false);
              }}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Qayta O'ynash
            </Button>
            
            {onLeave && (
              <Button 
                onClick={onLeave}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Home className="w-6 h-6 mr-2" />
                Xaritaga Qaytish
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative">
      {/* Leave button in bottom-left corner during game */}
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Badge variant="outline" className="text-white border-slate-600">
              <Clock className="w-4 h-4 mr-1" />
              {timeLeft}s
            </Badge>
            <Badge variant="outline" className="text-white border-slate-600">
              {questionsAnswered}/{maxQuestions} Masala
            </Badge>
            {waitingForPlayerMove && (
              <Badge variant="outline" className="text-white border-green-600 bg-green-600/20">
                Kvadratni tanlang!
              </Badge>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Math Problem Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="text-2xl">📐</span>
                  <span>Matematik Masala</span>
                </CardTitle>
                <Progress 
                  value={(timeLeft / (currentProblem?.timeLimit || 1)) * 100} 
                  className="w-full"
                />
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {currentProblem && (
                    <motion.div
                      key={currentProblem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="text-white text-lg leading-relaxed">
                        {currentProblem.question}
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAnswer(userAnswer)}
                          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                          placeholder="Javobingizni kiriting..."
                          autoFocus
                        />
                        <Button 
                          onClick={() => handleAnswer(userAnswer)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={!userAnswer.trim()}
                        >
                          Javob Berish
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Battleship Grid */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Grid3X3 className="w-6 h-6" />
                  X-O Maydoni
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-0 mb-4 max-w-xs mx-auto">
                  {grid.map((row, rowIndex) => 
                    row.map((cell, colIndex) => (
                      <motion.div
                        key={`${rowIndex}-${colIndex}`}
                        className={`
                          w-16 h-16 -mr-px -mb-px border border-slate-600 flex items-center justify-center text-2xl font-bold cursor-pointer
                          ${cell.owner === 'player' ? 'bg-red-500 text-white' : ''}
                          ${cell.owner === 'computer' ? 'bg-orange-500 text-white' : ''}
                          ${!cell.claimed ? 'bg-slate-700 hover:bg-slate-600' : ''}
                          ${waitingForPlayerMove && !cell.claimed ? 'hover:border-green-500' : ''}
                          ${!waitingForPlayerMove || cell.claimed ? 'cursor-not-allowed' : ''}
                        `}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        whileHover={!cell.claimed && waitingForPlayerMove ? { scale: 1.05 } : {}}
                        whileTap={!cell.claimed && waitingForPlayerMove ? { scale: 0.95 } : {}}
                      >
                        {cell.owner === 'player' && 'X'}
                        {cell.owner === 'computer' && 'O'}
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white font-bold">X</div>
                    <span className="text-gray-300">Siz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white font-bold">O</div>
                    <span className="text-gray-300">Kompyuter</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StrategicMathBattleship;

