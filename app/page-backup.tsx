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
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    currentBoss: null,
    currentQuestion: null,
    score: 0,
    lives: 3,
    gamePhase: "home",
    selectedSubject: null,
    isPremium: false,
    powerUps: {
      hint: 3,
      skip: 2,
      extraTime: 1,
    },
    achievements: [],
    statistics: {
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      gamesPlayed: 0,
      totalScore: 0,
      averageScore: 0,
      bestScore: 0,
      winRate: 0,
      overallLevel: 1,
    },
  });

  // Load saved game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("quizQuestGameState");
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
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quizQuestGameState", JSON.stringify(gameState));
  }, [gameState]);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setGameState(prev => ({
      ...prev,
      selectedSubject: subject,
      gamePhase: "map",
    }));
  };

  const handleShowLeaderboard = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "leaderboard",
    }));
  };

  const handleShowProfile = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "profile",
    }));
  };

  const handleShowGuide = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "guide",
    }));
  };

  const handleBackToHome = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "home",
      selectedSubject: null,
    }));
  };

  const handlePremiumPurchase = () => {
    setGameState(prev => ({
      ...prev,
      isPremium: true,
    }));
    toast.success("Premium activated! Enjoy unlimited access!");
  };

  // Simple render logic to avoid complex state management issues
  if (gameState.gamePhase === "home") {
    return (
      <HomePage
        onSelectSubject={handleSubjectSelect}
        onShowLeaderboard={handleShowLeaderboard}
        onShowProfile={handleShowProfile}
        onShowGuide={handleShowGuide}
        isPremium={gameState.isPremium}
        onPremiumPurchase={handlePremiumPurchase}
      />
    );
  }

  if (gameState.gamePhase === "leaderboard") {
    return <LeaderboardPage onBack={handleBackToHome} />;
  }

  if (gameState.gamePhase === "profile") {
    return <ProfilePage onBack={handleBackToHome} />;
  }

  if (gameState.gamePhase === "guide") {
    return <GuidePage onBack={handleBackToHome} />;
  }

  // For now, just show a simple message for other phases
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
