import { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Trophy, Star, Coins, Target, BookOpen, Award, Settings, Edit3 } from "lucide-react";

interface ProfilePageProps {
  onBack: () => void;
  onShowSettings?: () => void;
}

export const ProfilePage = ({ onBack, onShowSettings }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState("QuizMaster");
  const [tempName, setTempName] = useState(playerName);

  // Mock player data
  const playerStats = {
    totalCoins: 2450,
    totalXP: 1580,
    level: 12,
    gamesPlayed: 45,
    gamesWon: 38,
    winRate: 84,
    bestStreak: 15,
    currentStreak: 7,
    totalQuestions: 320,
    correctAnswers: 285,
    accuracy: 89,
    weeklyRank: 3,
    allTimeRank: 15
  };

  const achievements = [
    { id: 1, title: "Birinchi G'alaba", description: "Birinchi bossni mag'lub eting", icon: Trophy, unlocked: true },
    { id: 2, title: "10 Ketma-ket", description: "10 ta ketma-ket g'alaba", icon: Star, unlocked: true },
    { id: 3, title: "Matematika Ustasi", description: "Matematika kursini yakunlang", icon: BookOpen, unlocked: false },
    { id: 4, title: "Tez Javob", description: "5 soniyada javob bering", icon: Target, unlocked: true },
    { id: 5, title: "Haftalik Chempion", description: "Haftalik reytingda 1-o'rin", icon: Award, unlocked: false },
    { id: 6, title: "100 Savol", description: "100 ta savolga javob bering", icon: BookOpen, unlocked: true }
  ];

  const courseProgress = [
    { name: "Matematika", level: 6, progress: 75, color: "from-blue-500 to-cyan-500" },
    { name: "Biologiya", level: 4, progress: 60, color: "from-green-500 to-emerald-500" },
    { name: "Dasturlash", level: 2, progress: 30, color: "from-purple-500 to-pink-500" }
  ];

  const handleSaveName = () => {
    setPlayerName(tempName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempName(playerName);
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Animated Background Elements */}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-green-900/30 to-teal-900/20" />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-full blur-3xl"
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
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full blur-3xl"
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
              ["#10b981", "#059669", "#0d9488"][Math.floor(Math.random() * 3)]
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
        <div className="absolute bottom-0 left-0 w-8 h-32 bg-gradient-to-t from-emerald-500 to-transparent" />
        <div className="absolute bottom-0 left-12 w-8 h-40 bg-gradient-to-t from-green-500 to-transparent" />
        <div className="absolute bottom-0 left-24 w-8 h-28 bg-gradient-to-t from-teal-500 to-transparent" />
      </div>

      {/* Center Darker Area for Content */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/50 to-slate-900" />

      {/* Navigation Buttons */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-start">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg"
          >
            <Home className="w-8 h-8 text-white" />
          </motion.button>

          {/* Settings Button */}
          {onShowSettings && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onShowSettings}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg"
            >
              <Settings className="w-8 h-8 text-white" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <User className="w-20 h-20 md:w-24 md:h-24 text-emerald-400 mx-auto drop-shadow-2xl" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              style={{
                background: "linear-gradient(to right, #10b981, #059669, #0d9488)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
            PROFIL
          </h1>
          <p className="text-xl md:text-2xl text-white/80">O'yinchi ma'lumotlari va yutuqlar</p>
        </motion.div>

        {/* Player Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center border-4 border-white/20 shadow-2xl">
                <User className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-sm font-bold">{playerStats.level}</span>
              </div>
            </div>

            {/* Player Details */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-2xl font-bold text-center md:text-left"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveName}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      Saqlash
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Bekor qilish
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <h2 className="text-3xl font-bold text-white">{playerName}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Coins className="w-6 h-6 text-yellow-400" />
                  <span className="text-white text-lg">{playerStats.totalCoins} tanga</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-blue-400" />
                  <span className="text-white text-lg">{playerStats.totalXP} XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-purple-400" />
                  <span className="text-white text-lg">Daraja {playerStats.level}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: "O'yinlar", value: playerStats.gamesPlayed, icon: Target, color: "from-blue-500 to-cyan-500" },
            { title: "G'alabalar", value: playerStats.gamesWon, icon: Trophy, color: "from-green-500 to-emerald-500" },
            { title: "G'alaba %", value: `${playerStats.winRate}%`, icon: Star, color: "from-yellow-500 to-orange-500" },
            { title: "Eng yaxshi seriya", value: playerStats.bestStreak, icon: Award, color: "from-purple-500 to-pink-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl text-center"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-white/70">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Course Progress */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Kurs Progressi</h2>
          <div className="space-y-6">
            {courseProgress.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">{course.name}</h3>
                  <span className="text-white/70">Daraja {course.level}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 1 }}
                    className={`h-3 rounded-full bg-gradient-to-r ${course.color}`}
                  />
                </div>
                <p className="text-white/60 text-sm">{course.progress}% yakunlangan</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Yutuqlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                className={`relative overflow-hidden rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/20 shadow-xl' 
                    : 'bg-white/5 border-white/10 opacity-50'
                }`}
              >
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                      : 'bg-white/10'
                  }`}>
                    <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-white/50'}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${achievement.unlocked ? 'text-white' : 'text-white/50'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${achievement.unlocked ? 'text-white/70' : 'text-white/40'}`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <div className="absolute top-4 right-4">
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

