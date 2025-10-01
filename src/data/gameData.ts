import { Boss, Question } from "@/types/game";

export const BOSSES: Boss[] = [
  {
    id: 1,
    name: "Math Golem",
    maxHealth: 100,
    damage: 10,
    theme: "Mathematics",
    difficulty: 1
  },
  {
    id: 2,
    name: "Virus Monster",
    maxHealth: 150,
    damage: 15,
    theme: "Science",
    difficulty: 2
  },
  {
    id: 3,
    name: "History Pharaoh",
    maxHealth: 200,
    damage: 20,
    theme: "History",
    difficulty: 3
  },
  {
    id: 4,
    name: "Dragon Emperor",
    maxHealth: 300,
    damage: 25,
    theme: "Final Boss",
    difficulty: 4
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
    }
  ]
};
