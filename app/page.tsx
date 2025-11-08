'use client'

import { useState, useEffect } from "react";
import { HomePage } from "./components/pages/HomePage";
import { LeaderboardPage } from "./components/pages/LeaderboardPage";
import { GuidePage } from "./components/pages/GuidePage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { BattleScreen } from "@/components/game/BattleScreen";
import { MapScreen } from "@/components/game/MapScreen";
import { VictoryScreen } from "@/components/game/VictoryScreen";
import { DefeatScreen } from "@/components/game/DefeatScreen";
import StrategicMathBattleship from "@/components/game/StrategicMathBattleship";
import BiologyCaseStudy from "@/components/game/BiologyCaseStudy";
import BiologyMemoryMatch from "@/components/game/BiologyMemoryMatch";
import BiologySortingGame from "@/components/game/BiologySortingGame";
import MutantMonsterBattle from "@/components/game/MutantMonsterBattle";
import FlashQuiz from "@/components/game/FlashQuiz";
import FixTheBug from "@/components/game/FixTheBug";
import TrueFalseCodeGame from "@/components/game/TrueFalseCodeGame";
import CodeMatchingGame from "@/components/game/CodeMatchingGame";
import EquationBuilder from "@/components/game/EquationBuilder";
import { MathBossBattle } from "@/components/game/MathBossBattle";
import AlgoritmQorovuli from "@/components/game/AlgoritmQorovuli";
import { GameState, Boss, Question, Level } from "@/types/game";
import { LEVELS, BIOLOGY_LEVELS, MATH_LEVELS, CODING_LEVELS, BOSSES, QUESTIONS } from "@/data/gameData";
import { PowerUpType } from "@/components/game/PowerUpBar";
import { toast } from "sonner";

export default function Home() {
  // Additional state for UI navigation
  const [currentPage, setCurrentPage] = useState<"home" | "leaderboard" | "profile" | "guide" | "map">("home");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  
  // State for tracking completed levels per course
  const [completedLevels, setCompletedLevels] = useState<Record<string, number[]>>({
    math: [],
    biology: [],
    coding: []
  });
  
  const [gameState, setGameState] = useState<GameState>({
    player: {
      name: "Player",
      maxHealth: 100,
      currentHealth: 100,
      coins: 0,
      xp: 0,
      level: 1,
    },
    currentBoss: {
      id: 1,
      name: "Test Boss",
      maxHealth: 100,
      damage: 10,
      theme: "Test",
      difficulty: 1,
      icon: "🐲"
    },
    bossHealth: 100,
    currentQuestion: null,
    combo: 0,
    timeLeft: 15,
    gamePhase: "map",
    powerUps: {
      heal: 0,
      shield: 0,
      timeFreeze: 0,
      doubleDamage: 0,
    },
    hasShield: false,
    doubleDamageActive: false,
  });

  // Load saved game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("quizQuestGameState");
    const savedCompletedLevels = localStorage.getItem("quizQuestCompletedLevels");
    
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setGameState(prevState => ({
          ...prevState,
          ...parsedState,
          gamePhase: "home", // Always start from home
        }));
      } catch (error) {
        console.error("Error loading saved game state:", error);
      }
    }
    
    if (savedCompletedLevels) {
      try {
        const parsedCompletedLevels = JSON.parse(savedCompletedLevels);
        setCompletedLevels(parsedCompletedLevels);
      } catch (error) {
        console.error("Error loading completed levels:", error);
      }
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quizQuestGameState", JSON.stringify(gameState));
  }, [gameState]);

  // Save completed levels to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quizQuestCompletedLevels", JSON.stringify(completedLevels));
  }, [completedLevels]);

  // Helper function to get levels for a subject
  const getLevelsForSubject = (subject: string) => {
    switch (subject) {
      case "math":
        return MATH_LEVELS;
      case "biology":
        return BIOLOGY_LEVELS;
      case "coding":
        return CODING_LEVELS;
      default:
        return LEVELS;
    }
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setCurrentPage("map");
    setGameState(prev => ({
      ...prev,
      gamePhase: "map",
    }));
    
    // Set current level to the first uncompleted level for this subject
    const levels = getLevelsForSubject(subject);
    const subjectCompletedLevels = completedLevels[subject] || [];
    const firstUncompletedLevel = levels.find(level => !subjectCompletedLevels.includes(level.id));
    if (firstUncompletedLevel) {
      setCurrentLevel(firstUncompletedLevel.id);
    } else {
      setCurrentLevel(1); // If all levels completed, start from level 1
    }
  };

  const handleShowLeaderboard = () => {
    setCurrentPage("leaderboard");
  };

  const handleShowProfile = () => {
    setCurrentPage("profile");
  };

  const handleShowGuide = () => {
    setCurrentPage("guide");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedSubject(null);
  };


  // Render logic with basic game phases
  if (currentPage === "home") {
    return (
      <HomePage
        onSelectSubject={handleSubjectSelect}
        onShowLeaderboard={handleShowLeaderboard}
        onShowProfile={handleShowProfile}
        onShowGuide={handleShowGuide}
      />
    );
  }

  if (currentPage === "leaderboard") {
    return <LeaderboardPage onBack={handleBackToHome} />;
  }

  if (currentPage === "profile") {
    return <ProfilePage onBack={handleBackToHome} />;
  }

  if (currentPage === "guide") {
    return <GuidePage onBack={handleBackToHome} />;
  }

  if (gameState.gamePhase === "battle") {

    // Helper function to handle level completion
    const handleLevelCompletion = (successRate?: number) => {
      const subject = selectedSubject || "math";
      
      if (successRate && successRate >= 80) {
        // Level completed successfully - mark as completed and go back to map
        setCompletedLevels(prev => {
          const newCompleted = [...(prev[subject] || []), currentLevel].filter((value, index, self) => self.indexOf(value) === index);
          return {
            ...prev,
            [subject]: newCompleted
          };
        });
        
        // Update current level to the next uncompleted level
        const levels = getLevelsForSubject(subject);
        const nextUncompletedLevel = levels.find(level => !completedLevels[subject]?.includes(level.id) && level.id > currentLevel);
        if (nextUncompletedLevel) {
          setCurrentLevel(nextUncompletedLevel.id);
        }
        
        // Always go back to map after completing a level
        setGameState(prev => ({
          ...prev,
          gamePhase: "map",
        }));
      } else {
        // Level not completed or failed, go back to map
        setGameState(prev => ({
          ...prev,
          gamePhase: "map",
        }));
      }
    };

    const levels = getLevelsForSubject(selectedSubject || "math");
    const currentLevelData = levels.find(level => level.id === currentLevel);

    if (!currentLevelData) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Level Not Found</h1>
            <p className="text-xl mb-8">The selected level could not be found.</p>
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    // Render the appropriate battle component based on the level type
    if (currentLevelData.type === "battleship") {
      return (
        <StrategicMathBattleship
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "biology-memory-match") {
      return (
        <BiologyMemoryMatch
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "biology-case-study") {
      return (
        <BiologyCaseStudy
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "biology-sorting") {
      return (
        <BiologySortingGame
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "mutant-monster-battle") {
      return (
        <MutantMonsterBattle
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "flash-quiz") {
      return (
        <FlashQuiz
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "equation-builder") {
      return (
        <EquationBuilder
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "math-boss-battle") {
      return (
        <MathBossBattle
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "fix-the-bug") {
      return (
        <FixTheBug
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "true-false-code") {
      return (
        <TrueFalseCodeGame
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "code-matching") {
      return (
        <CodeMatchingGame
          onLeave={handleLevelCompletion}
        />
      );
    }

    if (currentLevelData.type === "algoritm-qorovuli") {
      return (
        <AlgoritmQorovuli
          onLeave={handleLevelCompletion}
        />
      );
    }

    // For other battle types, show a generic battle screen
    // Create a mock question for the battle screen
    const mockQuestion: Question = {
      id: "1",
      question: "What is 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correctAnswer: 1,
      hint: "Basic addition",
      category: "Mathematics"
    };

    // Create a battle game state with proper structure for BattleScreen
    const battleGameState: GameState = {
      player: {
        name: "Player",
        maxHealth: 100,
        currentHealth: 100,
        coins: 0,
        xp: 0,
        level: 1,
      },
      currentBoss: {
        id: 1,
        name: "Test Boss",
        maxHealth: 100,
        damage: 10,
        theme: "Test",
        difficulty: 1,
        icon: "🐲"
      },
      bossHealth: 100,
      currentQuestion: {
        id: "1",
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correctAnswer: 1,
        hint: "Basic addition",
        category: "Mathematics"
      },
      combo: 0,
      timeLeft: 15,
      gamePhase: "battle",
      powerUps: {
        heal: 0,
        shield: 0,
        timeFreeze: 0,
        doubleDamage: 0,
      },
      hasShield: false,
      doubleDamageActive: false,
    };

    return (
      <BattleScreen
        gameState={battleGameState}
        onAnswer={(correct: boolean, timeLeft: number) => {
          if (correct) {
            setGameState(prev => ({
              ...prev,
              gamePhase: "victory",
            }));
          } else {
            setGameState(prev => ({
              ...prev,
              gamePhase: "defeat",
            }));
          }
        }}
        onPowerUp={(type: PowerUpType) => {
          // Handle power-up usage
          console.log("Power-up used:", type);
        }}
        onVictory={() => {
          setGameState(prev => ({
            ...prev,
            gamePhase: "victory",
          }));
        }}
        onDefeat={() => {
          setGameState(prev => ({
            ...prev,
            gamePhase: "defeat",
          }));
        }}
        onLeave={() => {
          setCurrentPage("map");
        }}
      />
    );
  }

  if (gameState.gamePhase === "victory") {
    return (
      <VictoryScreen
        bossName="Level Complete"
        coinsEarned={100}
        xpEarned={50}
        badgeEarned="First Victory"
        onContinue={() => {
          setGameState(prev => ({
            ...prev,
            gamePhase: "map",
          }));
        }}
        onGiftCoins={() => {
          // Handle gift coins
        }}
        isBoss={false}
      />
    );
  }

  if (gameState.gamePhase === "defeat") {
    return (
      <DefeatScreen
        bossName="Level Failed"
        onRetry={() => {
          setGameState(prev => ({
            ...prev,
            gamePhase: "battle",
          }));
        }}
        onBackToMap={() => {
          setGameState(prev => ({
            ...prev,
            gamePhase: "map",
          }));
        }}
      />
    );
  }

  // Show map screen for map phase
  if (gameState.gamePhase === "map") {

    const levels = getLevelsForSubject(selectedSubject || "math");
    const subject = selectedSubject || "math";
    const courseCompletedLevels = completedLevels[subject] || [];

    return (
      <MapScreen
        levels={levels}
        currentLevelId={currentLevel}
        completedLevels={courseCompletedLevels}
        onSelectLevel={(level) => {
          setCurrentLevel(level.id);
          setGameState(prev => ({
            ...prev,
            gamePhase: "battle",
          }));
        }}
        onHome={handleBackToHome}
        onShowProfile={handleShowProfile}
        onShowGuide={handleShowGuide}
        subject={selectedSubject || "math"}
      />
    );
  }

  // For other phases, show a loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Game Phase: {gameState.gamePhase}</h1>
        <p className="text-xl mb-8">Loading game components...</p>
        <button
          onClick={handleBackToHome}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
