import { Boss, Question, Level } from "@/types/game";

// Biology Course Levels
export const BIOLOGY_LEVELS: Level[] = [
  // Biology Memory Match - First level for Biology course
  {
    id: 1,
    name: "Xotira O'yini",
    type: "biology-memory-match",
    theme: "Biology",
    difficulty: 1,
    icon: "🧠",
    questionsRequired: 3
  },
  // Biology Case Study - Second level for Biology course
  {
    id: 2,
    name: "Biologiya Tadqiqoti",
    type: "biology-case-study",
    theme: "Biology",
    difficulty: 1,
    icon: "🧬",
    questionsRequired: 5
  },
  // Biology Sorting Game - Third level for Biology course
  {
    id: 3,
    name: "Saralash O'yini",
    type: "biology-sorting",
    theme: "Biology",
    difficulty: 1,
    icon: "📋",
    questionsRequired: 12
  },
  // Mutant Monster Battle - Final level for Biology course
  {
    id: 4,
    name: "Mutant Monster Jang",
    type: "mutant-monster-battle",
    theme: "Biology",
    difficulty: 2,
    icon: "👹",
    questionsRequired: 8
  }
];

// Mathematics Course Levels
export const MATH_LEVELS: Level[] = [
  // Strategic Math Battleship - First level for Math course
  {
    id: 1,
    name: "X-O O'yin",
    type: "battleship",
    theme: "Mathematics",
    difficulty: 1,
    icon: "🎯",
    questionsRequired: 10
  },
  // Flash Quiz - Second level for Math course
  {
    id: 2,
    name: "Flash Quiz",
    type: "flash-quiz",
    theme: "Mathematics",
    difficulty: 1,
    icon: "⚡",
    questionsRequired: 8
  },
  // Equation Builder - Third level for Math course
  {
    id: 3,
    name: "Tenglama Yig'uvchi",
    type: "equation-builder",
    theme: "Mathematics",
    difficulty: 1,
    icon: "🧮",
    questionsRequired: 5
  },
  // Math Boss Battle - Final level for Math course
  {
    id: 4,
    name: "Matematik Boss Jangi",
    type: "math-boss-battle",
    theme: "Mathematics",
    difficulty: 2,
    icon: "⚔️",
    questionsRequired: 7
  }
];

// Coding Course Levels
export const CODING_LEVELS: Level[] = [
  // Fix the Bug - First level for Coding course
  {
    id: 1,
    name: "Xatolikni Tuzatish",
    type: "fix-the-bug",
    theme: "Coding",
    difficulty: 1,
    icon: "🐛",
    questionsRequired: 5
  },
  // True or False Code Game - Second level for Coding course
  {
    id: 2,
    name: "To'g'ri yoki Noto'g'ri",
    type: "true-false-code",
    theme: "Coding",
    difficulty: 1,
    icon: "✅❌",
    questionsRequired: 5
  },
  // Code Matching Game - Third level for Coding course
  {
    id: 3,
    name: "Kod → Natija Moslashtirish",
    type: "code-matching",
    theme: "Coding",
    difficulty: 1,
    icon: "🔗",
    questionsRequired: 6
  },
  // Algoritm Qorovuli - Final boss for Coding course
  {
    id: 4,
    name: "Algoritm Qorovuli",
    type: "algoritm-qorovuli",
    theme: "Coding",
    difficulty: 3,
    icon: "🛡️",
    questionsRequired: 8
  }
];

// Default levels (for backward compatibility)
export const LEVELS = MATH_LEVELS;

export const BOSSES: Boss[] = [
  {
    id: 1,
    name: "Baby Dragon",
    maxHealth: 60,
    damage: 10,
    theme: "Mathematics",
    difficulty: 1,
    icon: "🐲"
  },
  {
    id: 2,
    name: "Young Dragon",
    maxHealth: 80,
    damage: 15,
    theme: "Science",
    difficulty: 2,
    icon: "🐉"
  },
  {
    id: 3,
    name: "Dragon Warrior",
    maxHealth: 100,
    damage: 20,
    theme: "History",
    difficulty: 3,
    icon: "🔥"
  },
  {
    id: 4,
    name: "Dragon Emperor",
    maxHealth: 120,
    damage: 25,
    theme: "Final Boss",
    difficulty: 4,
    icon: "👑🐉"
  }
];

export const QUESTIONS: Record<string, Question[]> = {
  Mathematics: [
    {
      id: "math1",
      question: "What is 7 × 8?",
      answers: ["54", "56", "58", "52"],
      correctAnswer: 1,
      hint: "Think about 7 groups of 8",
      category: "Mathematics"
    },
    {
      id: "math2",
      question: "What is the square root of 144?",
      answers: ["10", "11", "12", "13"],
      correctAnswer: 2,
      hint: "What number multiplied by itself equals 144?",
      category: "Mathematics"
    },
    {
      id: "math3",
      question: "If a triangle has angles of 60°, 60°, what is the third angle?",
      answers: ["30°", "45°", "60°", "90°"],
      correctAnswer: 2,
      hint: "All angles in a triangle sum to 180°",
      category: "Mathematics"
    }
  ],
  Science: [
    {
      id: "sci1",
      question: "What is the chemical symbol for Gold?",
      answers: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2,
      hint: "It comes from the Latin name 'Aurum'",
      category: "Science"
    },
    {
      id: "sci2",
      question: "How many planets are in our solar system?",
      answers: ["7", "8", "9", "10"],
      correctAnswer: 1,
      hint: "Pluto is no longer classified as a planet",
      category: "Science"
    },
    {
      id: "sci3",
      question: "What is the powerhouse of the cell?",
      answers: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
      correctAnswer: 1,
      hint: "It produces energy (ATP) for the cell",
      category: "Science"
    }
  ],
  History: [
    {
      id: "hist1",
      question: "In which year did World War II end?",
      answers: ["1943", "1944", "1945", "1946"],
      correctAnswer: 2,
      hint: "The same year the atomic bombs were dropped",
      category: "History"
    },
    {
      id: "hist2",
      question: "Who was the first President of the United States?",
      answers: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
      correctAnswer: 1,
      hint: "His face is on the $1 bill",
      category: "History"
    },
    {
      id: "hist3",
      question: "Which ancient wonder is still standing?",
      answers: ["Colossus of Rhodes", "Great Pyramid of Giza", "Hanging Gardens", "Lighthouse of Alexandria"],
      correctAnswer: 1,
      hint: "It's located in Egypt",
      category: "History"
    }
  ],
  Geography: [
    {
      id: "geo1",
      question: "What is the capital of France?",
      answers: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      hint: "The city of lights",
      category: "Geography"
    },
    {
      id: "geo2",
      question: "Which is the largest ocean on Earth?",
      answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: 3,
      hint: "It covers more than 30% of Earth's surface",
      category: "Geography"
    },
    {
      id: "geo3",
      question: "What is the longest river in the world?",
      answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correctAnswer: 1,
      hint: "It flows through Egypt",
      category: "Geography"
    }
  ],
  General: [
    {
      id: "gen1",
      question: "How many continents are there?",
      answers: ["5", "6", "7", "8"],
      correctAnswer: 2,
      hint: "Africa, Antarctica, Asia, Europe, North America, Oceania, South America",
      category: "General"
    },
    {
      id: "gen2",
      question: "What is 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correctAnswer: 1,
      hint: "Basic arithmetic",
      category: "General"
    },
    {
      id: "gen3",
      question: "How many days are in a year?",
      answers: ["364", "365", "366", "360"],
      correctAnswer: 1,
      hint: "Not counting leap years",
      category: "General"
    }
  ],
  "Final Boss": [
    {
      id: "final1",
      question: "What is the speed of light?",
      answers: ["299,792 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
      correctAnswer: 0,
      hint: "Approximately 300,000 km/s",
      category: "Final Boss"
    },
    {
      id: "final2",
      question: "Who painted the Mona Lisa?",
      answers: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
      correctAnswer: 2,
      hint: "He was also an inventor and scientist",
      category: "Final Boss"
    },
    {
      id: "final3",
      question: "What is the smallest prime number?",
      answers: ["0", "1", "2", "3"],
      correctAnswer: 2,
      hint: "It's the only even prime number",
      category: "Final Boss"
    }
  ]
};
