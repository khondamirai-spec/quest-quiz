export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  hint?: string;
  category: string;
}

export interface Level {
  id: number;
  name: string;
  type: "test" | "boss" | "battleship" | "racing" | "biology-case-study" | "biology-memory-match" | "flash-quiz" | "fix-the-bug" | "true-false-code";
  theme: string;
  difficulty: number;
  icon: string;
  questionsRequired?: number; // For test levels
  maxHealth?: number; // For boss levels
  damage?: number; // For boss levels
}

export interface Boss {
  id: number;
  name: string;
  maxHealth: number;
  damage: number;
  theme: string;
  difficulty: number;
  icon: string;
}

export interface Avatar {
  id: number;
  svg: React.ReactNode;
  alt: string;
}

export interface Player {
  name: string;
  maxHealth: number;
  currentHealth: number;
  coins: number;
  xp: number;
  level: number;
  avatar?: Avatar;
}

export interface GameState {
  player: Player;
  currentBoss: Boss;
  bossHealth: number;
  currentQuestion: Question | null;
  combo: number;
  timeLeft: number;
  gamePhase: "map" | "battle" | "victory" | "defeat" | "avatar-selection" | "battleship" | "racing" | "biology-case-study" | "biology-memory-match" | "flash-quiz" | "fix-the-bug" | "true-false-code";
  powerUps: {
    heal: number;
    shield: number;
    timeFreeze: number;
    doubleDamage: number;
  };
  hasShield: boolean;
  doubleDamageActive: boolean;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  highestBoss: number;
  totalCoins: number;
  winStreak: number;
  fastestDefeat: number;
}
