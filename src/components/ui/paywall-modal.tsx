import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Star, Zap, Trophy, Lock, CheckCircle } from "lucide-react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
}

export const PaywallModal = ({ isOpen, onClose, onPurchase }: PaywallModalProps) => {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsPurchasing(false);
    onPurchase();
    onClose();
  };

  const features = [
    {
      icon: Star,
      title: "Yangi maxsus darajalar",
      description: "Premium ekskluziv kontent va yangi boss janglari"
    },
    {
      icon: Lock,
      title: "Yashirin boss janglari", 
      description: "Maxsus bosslar va epik janglar faqat Premium a'zolar uchun"
    },
    {
      icon: Trophy,
      title: "Noyob mukofotlar va sovrinlar",
      description: "Premium sovrinlar, ekskluziv avatar va maxsus mukofotlar"
    },
    {
      icon: Zap,
      title: "Cheksiz kuchaytirgichlar",
      description: "Premium kuchaytirgichlar va maxsus imkoniyatlar"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-0 overflow-hidden">
        <div className="relative">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/30 to-pink-500/20" />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 1, 0.2],
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
          <div className="relative z-10 p-6 text-center">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Star className="w-8 h-8 text-white" />
              </motion.div>
              
              <h2 className="text-xl font-bold text-white mb-2">
                Keyingi sayohatni boshlang
              </h2>
              <p className="text-gray-300 text-sm mb-3">
                Premium Sarguzashtni oching va barcha imkoniyatlardan foydalaning
              </p>
              
              {/* Price Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg p-3 mb-4 border border-yellow-400/30"
              >
                <div className="text-3xl font-bold text-yellow-400 mb-1">50.000 so'm</div>
                <div className="text-xs text-gray-300">Bir marta to'lov - umrbod foydalanish</div>
              </motion.div>
            </motion.div>

            {/* Features List */}
            <div className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-2 p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <feature.icon className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold text-xs">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-xs leading-tight">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Purchase Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                onClick={handlePurchase}
                disabled={isPurchasing}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <AnimatePresence mode="wait">
                  {isPurchasing ? (
                    <motion.div
                      key="purchasing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sotib olinmoqda...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="purchase"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Star className="w-5 h-5" />
                      Sotib olish
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
