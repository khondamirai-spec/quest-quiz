export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  hint?: string;
  category: string;
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

export interface Player {
  name: string;
  maxHealth: number;
  currentHealth: number;
  coins: number;
  xp: number;
  level: number;
}

export interface GameState {
  player: Player;
  currentBoss: Boss;
  bossHealth: number;
  currentQuestion: Question | null;
  combo: number;
  timeLeft: number;
  gamePhase: "map" | "battle" | "victory" | "defeat";
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
