// AchievementNotification.jsx
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const rarityColors = {
  common: {
    bg: "from-blue-500/20 to-green-500/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
    progress: "bg-gradient-to-r from-blue-500 to-green-500",
  },
  uncommon: {
    bg: "from-cyan-500/20 to-purple-500/20",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    progress: "bg-gradient-to-r from-cyan-500 to-purple-500",
  },
  rare: {
    bg: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
    progress: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  legendary: {
    bg: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    text: "text-amber-400",
    progress: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
};

const AchievementNotification = ({ achievement, onClose }) => {
  // Ensure achievement has all required properties with fallbacks
  const safeAchievement = {
    title: achievement?.title || "Achievement Unlocked",
    description: achievement?.description || "You've earned a new achievement!",
    icon: achievement?.icon || "",
    category: achievement?.category || "General",
    rarity: achievement?.rarity || "common",
    xpReward: achievement?.xpReward || 0
  };
  
  const rarity = safeAchievement.rarity;
  const rarityStyle = rarityColors[rarity] || rarityColors.common;

  useEffect(() => {
    // Trigger confetti when achievement notification appears
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00F0FF", "#FF006F", "#FFD700"],
      });
    } catch (error) {
      console.error("Error triggering confetti:", error);
    }

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="fixed top-4 right-4 z-50 max-w-md"
      >
        <div
          className={`bg-[#111111] rounded-xl p-6 border ${rarityStyle.border}
            shadow-lg shadow-black/50 relative overflow-hidden`}
        >
          {/* Background gradient based on rarity */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${rarityStyle.bg} opacity-20`}
          ></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">
                Achievement Unlocked!
              </h3>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-xl">
                {safeAchievement.icon}
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  {safeAchievement.title}
                </h4>
                <p className="text-sm text-neutral-400">{safeAchievement.category}</p>
              </div>
            </div>

            <p className="text-neutral-300 text-sm mb-3">
              {safeAchievement.description}
            </p>

            <div className="flex justify-between items-center">
              <span
                className={`${rarityStyle.text} text-sm font-medium capitalize`}
              >
                {rarity} Achievement
              </span>
              <span className="text-[#FFD700] font-bold">
                +{safeAchievement.xpReward} XP
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

AchievementNotification.propTypes = {
  achievement: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    category: PropTypes.string,
    rarity: PropTypes.string,
    xpReward: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};

export default AchievementNotification;