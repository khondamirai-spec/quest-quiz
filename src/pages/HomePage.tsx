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
      name: "Matematika",
      icon: "∑",
      color: "from-blue-600 via-cyan-500 to-teal-600",
      hoverColor: "from-blue-700 via-cyan-600 to-teal-700",
      glowColor: "shadow-blue-500/50",
      description: "Sonlar, tenglamalar va mantiq",
      accent: "bg-blue-500/20",
    },
    {
      id: "biology",
      name: "Biologiya",
      icon: "🧬",
      color: "from-emerald-600 via-green-500 to-lime-600",
      hoverColor: "from-emerald-700 via-green-600 to-lime-700",
      glowColor: "shadow-emerald-500/50",
      description: "Hayot fanlari va organizmlar",
      accent: "bg-emerald-500/20",
    },
    {
      id: "coding",
      name: "Dasturlash",
      icon: "</>",
      color: "from-purple-600 via-violet-500 to-fuchsia-600",
      hoverColor: "from-purple-700 via-violet-600 to-fuchsia-700",
      glowColor: "shadow-purple-500/50",
      description: "Dasturlash va algoritmlar",
      accent: "bg-purple-500/20",
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
            className="inline-block mb-0 -mt-12"
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
              alt="Quiz Quest Logosi" 
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 -mt-8"
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
            O'rganish. Jang qilish. G'alaba qilish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-4 text-sm text-gray-400"
          >
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Epik Janglar
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-blue-500" />
              Kuchaytirgichlar
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-purple-500" />
              Yutuqlar
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
            O'zingizning Questingizni Tanlang
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -8 }}
                onHoverStart={() => setHoveredSubject(subject.id)}
                onHoverEnd={() => setHoveredSubject(null)}
                className="relative group"
              >
                <button
                  onClick={() => onSelectSubject(subject.id)}
                  className="w-full h-full"
                >
                  <div
                    className={`
                      relative overflow-hidden rounded-3xl p-8 h-80
                      bg-gradient-to-br ${subject.color}
                      shadow-2xl ${subject.glowColor}
                      border border-white/30
                      transition-all duration-500 ease-out
                      backdrop-blur-sm
                      ${hoveredSubject === subject.id ? "border-white/60 shadow-3xl" : ""}
                    `}
                  >
                    {/* Elegant Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20" />
                    
                    {/* Animated Glow Effect */}
                    <motion.div
                      className={`
                        absolute inset-0 opacity-0 group-hover:opacity-100
                        bg-gradient-to-br ${subject.hoverColor}
                        transition-all duration-500
                      `}
                      animate={hoveredSubject === subject.id ? {
                        background: [`linear-gradient(135deg, ${subject.color}, ${subject.hoverColor})`, 
                                   `linear-gradient(135deg, ${subject.hoverColor}, ${subject.color})`]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Floating Particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 ${subject.accent} rounded-full`}
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                      {/* Icon Container */}
                      <motion.div
                        className="relative mb-6"
                        animate={
                          hoveredSubject === subject.id
                            ? {
                                scale: [1, 1.15, 1],
                                rotate: [0, 5, -5, 0],
                              }
                            : {}
                        }
                        transition={{ duration: 0.8 }}
                      >
                        {/* Icon Background Glow */}
                        <div className={`absolute inset-0 rounded-full ${subject.accent} blur-xl scale-150 opacity-60`} />
                        <div className="relative text-6xl font-bold filter drop-shadow-2xl text-center">
                          {subject.id === "math" && (
                            <div className="text-8xl font-light text-blue-100">
                              ∑
                            </div>
                          )}
                          {subject.id === "biology" && (
                            <div className="text-7xl">
                              🧬
                            </div>
                          )}
                          {subject.id === "coding" && (
                            <div className="text-5xl font-mono text-purple-100">
                              &lt;/&gt;
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h3 
                        className="text-3xl sm:text-4xl font-bold mb-3 text-center"
                        animate={
                          hoveredSubject === subject.id
                            ? { scale: [1, 1.05, 1] }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {subject.name}
                      </motion.h3>

                      {/* Description */}
                      <motion.p 
                        className="text-base sm:text-lg text-white/90 mb-8 text-center leading-relaxed"
                        animate={
                          hoveredSubject === subject.id
                            ? { opacity: [0.9, 1, 0.9] }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {subject.description}
                      </motion.p>

                      {/* Call to Action */}
                      <motion.div
                        className="flex items-center gap-3 px-6 py-3 bg-white/20 rounded-full backdrop-blur-md border border-white/30"
                        animate={
                          hoveredSubject === subject.id
                            ? { 
                                scale: [1, 1.05, 1],
                                x: [0, 3, 0],
                                backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.2)"]
                              }
                            : {}
                        }
                        transition={{ duration: 0.6, repeat: Infinity }}
                      >
                        <span className="text-sm font-semibold tracking-wide">Questni Boshlash</span>
                        <motion.span 
                          className="text-xl"
                          animate={
                            hoveredSubject === subject.id
                              ? { x: [0, 5, 0] }
                              : {}
                          }
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* Elegant Corner Accents */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-xl" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-xl" />
                    
                    {/* Subtle Inner Border */}
                    <div className="absolute inset-4 rounded-2xl border border-white/10" />
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
          <p>Savollarga to'g'ri javob bering va bosslarni mag'lub eting va mukofotlar oling!</p>
        </motion.div>
      </div>
    </div>
  );
};

