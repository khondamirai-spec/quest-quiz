import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Atom, Trophy, Zap, Star } from "lucide-react";

interface HomePageProps {
  onSelectSubject: (subject: string) => void;
}

export const HomePage = ({ onSelectSubject }: HomePageProps) => {
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  const subjects = [
    {
      id: "math",
      name: "Mathematics",
      icon: "🔢",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "from-blue-600 to-cyan-600",
      description: "Numbers, equations & logic",
    },
    {
      id: "biology",
      name: "Biology",
      icon: "🧬",
      color: "from-green-500 to-emerald-500",
      hoverColor: "from-green-600 to-emerald-600",
      description: "Life science & organisms",
    },
    {
      id: "coding",
      name: "Coding",
      icon: "💻",
      color: "from-purple-500 to-pink-500",
      hoverColor: "from-purple-600 to-pink-600",
      description: "Programming & algorithms",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20" />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-500/30 to-cyan-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Sparks/Light Orbs */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              ["#60a5fa", "#a78bfa", "#f472b6"][Math.floor(Math.random() * 3)]
            }, transparent)`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Mountain Silhouettes */}
      <div className="absolute bottom-0 left-0 w-full h-64 opacity-20">
        <svg
          viewBox="0 0 1200 300"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,300 L0,200 L200,100 L400,180 L600,80 L800,150 L1000,100 L1200,180 L1200,300 Z"
            fill="url(#mountainGradient)"
          />
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Futuristic Structures */}
      <div className="absolute bottom-0 right-20 w-32 h-48 opacity-10">
        <div className="absolute bottom-0 left-0 w-8 h-32 bg-gradient-to-t from-blue-500 to-transparent" />
        <div className="absolute bottom-0 left-12 w-8 h-40 bg-gradient-to-t from-purple-500 to-transparent" />
        <div className="absolute bottom-0 left-24 w-8 h-28 bg-gradient-to-t from-pink-500 to-transparent" />
      </div>

      {/* Center Darker Area for Content */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/50 to-slate-900" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        {/* Logo/Title Area */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Animated Logo */}
          <motion.div
            className="inline-block mb-0 -mt-24"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img 
              src="/logo.png" 
              alt="Quiz Quest Logo" 
              className="w-80 h-80 sm:w-[28rem] sm:h-[28rem] md:w-[40rem] md:h-[40rem] lg:w-[48rem] lg:h-[48rem] object-contain"
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 -mt-16"
            style={{
              background: "linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Quiz Quest
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-2"
          >
            Learn. Battle. Conquer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-4 text-sm text-gray-400"
          >
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Epic Battles
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-blue-500" />
              Power-Ups
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-purple-500" />
              Achievements
            </span>
          </motion.div>
        </motion.div>

        {/* Subject Selection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-5xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8">
            Choose Your Quest
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setHoveredSubject(subject.id)}
                onHoverEnd={() => setHoveredSubject(null)}
                className="relative"
              >
                <button
                  onClick={() => onSelectSubject(subject.id)}
                  className="w-full h-full group"
                >
                  <div
                    className={`
                      relative overflow-hidden rounded-2xl p-8
                      bg-gradient-to-br ${subject.color}
                      shadow-2xl shadow-${subject.id}/50
                      border-2 border-white/20
                      transition-all duration-300
                      ${hoveredSubject === subject.id ? "border-white/40" : ""}
                    `}
                  >
                    {/* Glow Effect */}
                    <div
                      className={`
                        absolute inset-0 opacity-0 group-hover:opacity-100
                        bg-gradient-to-br ${subject.hoverColor}
                        transition-opacity duration-300
                      `}
                    />

                    {/* Animated Background Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-white">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={
                          hoveredSubject === subject.id
                            ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {subject.icon}
                      </motion.div>

                      <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                        {subject.name}
                      </h3>

                      <p className="text-sm sm:text-base text-white/80 mb-6">
                        {subject.description}
                      </p>

                      <motion.div
                        className="flex items-center gap-2 text-sm font-semibold"
                        animate={
                          hoveredSubject === subject.id
                            ? { x: [0, 5, 0] }
                            : {}
                        }
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        Start Quest
                        <span className="text-xl">→</span>
                      </motion.div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-2xl" />
                    <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-white/30 rounded-bl-2xl" />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 text-center text-gray-400 text-sm"
        >
          <p>Answer questions correctly to defeat bosses and earn rewards!</p>
        </motion.div>
      </div>
    </div>
  );
};

