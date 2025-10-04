import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, User, BookOpen, Trophy, Zap, Star, Shield, Sword, Target, Clock, Flame, Coins, Gift } from "lucide-react";

interface GuidePageProps {
  onBack: () => void;
  onShowProfile?: () => void;
}

const guideSections = [
  {
    id: "basics",
    title: "O'yin Qo'llanmasi",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
    items: [
      {
        title: "O'yin Maqsadi",
        description: "Savollarga to'g'ri javob bering va bosslarni mag'lub eting. Har bir to'g'ri javob bossga zarar yetkazadi.",
        icon: Target
      },
      {
        title: "3 ta Kurs",
        description: "Matematika, Biologiya va Dasturlash kurslaridan birini tanlang. Har bir kurs o'ziga xos savollar va bosslarga ega.",
        icon: BookOpen
      },
      {
        title: "Progress Tizimi",
        description: "Bir kursda yuqori darajaga chiqish yoki bir necha kursda teng darajada o'tish - ikkalasi ham hisoblanadi. Masalan: 6-darajaga Matematikada yoki 3-darajaga 2 ta kursda.",
        icon: Star
      },
      {
        title: "Vaqt Chegarasi",
        description: "Har bir savol uchun 15 soniya vaqt bor. Vaqt tugasa, savol noto'g'ri hisoblanadi.",
        icon: Clock
      },
      {
        title: "Mukofotlar",
        description: "Har bir to'g'ri javob uchun tangalar va XP olasiz. Bosslarni mag'lub etib, yangi darajalarga chiqing!",
        icon: Trophy
      }
    ]
  },
  {
    id: "gifts",
    title: "Haftalik Sovg'alar",
    icon: Gift,
    color: "from-yellow-500 to-orange-500",
    items: [
      {
        title: "Haftalik Reyting",
        description: "Har hafta oxirida barcha ballar va progress qayta boshlanadi. Bu barcha o'yinchilar uchun adolatli imkoniyat yaratadi.",
        icon: Trophy
      },
      {
        title: "Reyting Sovg'alari",
        description: "Haftalik reytingda yuqori o'rinlarni egallagan o'yinchilar maxsus tangalar bilan mukofotlanadi.",
        icon: Coins
      },
      {
        title: "1-o'rin",
        description: "Haftalik reytingda 1-o'rinni egallagan o'yinchi 250 tanga oladi.",
        icon: Star
      },
      {
        title: "2-3 o'rinlar",
        description: "2 va 3-o'rinlarni egallagan o'yinchilar mos ravishda 200 va 150 tanga oladi.",
        icon: Star
      },
      {
        title: "4-5 o'rinlar",
        description: "4 va 5-o'rinlarni egallagan o'yinchilar mos ravishda 100 va 75 tanga oladi.",
        icon: Star
      },
      {
        title: "6-10 o'rinlar",
        description: "Reytingda 6-10 o'rinlarni egallagan o'yinchilar 50 tanga oladi.",
        icon: Star
      }
    ]
  }
];

export const GuidePage = ({ onBack, onShowProfile }: GuidePageProps) => {
  const [activeSection, setActiveSection] = useState("basics");

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
            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <Home className="w-8 h-8 text-white" />
          </motion.button>

          {/* Profile Button */}
          {onShowProfile && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onShowProfile}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-sm border border-white/20"
            >
              <User className="w-8 h-8 text-white" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
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
              <BookOpen className="w-20 h-20 md:w-24 md:h-24 text-emerald-400 mx-auto drop-shadow-2xl" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                style={{
                  background: "linear-gradient(to right, #10b981, #059669, #0d9488)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
              QO'LLANMA
            </h1>
            <p className="text-xl md:text-2xl text-white/80">O'yinni to'liq o'rganing</p>
          </motion.div>

          {/* Section Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {guideSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300
                    ${activeSection === section.id 
                      ? `bg-gradient-to-r ${section.color} shadow-2xl` 
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">{section.title}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Content Area */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {guideSections
              .find(section => section.id === activeSection)
              ?.items.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 backdrop-blur-sm shadow-2xl hover:border-white/40 transition-all duration-300"
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/20">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-white/80 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
                  </motion.div>
                );
              })}
          </motion.div>

        </div>
      </div>
    </div>
  );
};
