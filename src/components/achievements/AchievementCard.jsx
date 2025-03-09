import { motion } from "framer-motion";
import PropTypes from "prop-types";

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

const AchievementCard = ({ achievement }) => {
  const isUnlocked = achievement.unlockedAt !== null;
  const rarity = achievement.rarity || "common";
  const rarityStyle = rarityColors[rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#111111] rounded-xl p-6 border ${rarityStyle.border}
        hover:border-[#00F0FF] transition-all duration-300 relative overflow-hidden`}
    >
      {/* Background gradient based on rarity */}
      <div className={`absolute inset-0 bg-gradient-to-br ${rarityStyle.bg} opacity-20`}></div>
      
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-xl">
            {achievement.icon || "🏆"}
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-white">{achievement.title}</h3>
            <p className="text-sm text-neutral-400">{achievement.category}</p>
          </div>
        </div>
        {achievement.xpReward && (
          <span className="text-[#FFD700] font-bold">
            +{achievement.xpReward} XP
          </span>
        )}
      </div>

      <p className="text-neutral-300 text-sm mb-4">{achievement.description}</p>

      <div className="space-y-2">
        {/* Progress bar */}
        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${rarityStyle.progress}`}
            style={{ width: `${achievement.progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className={`${rarityStyle.text} font-medium capitalize`}>{rarity}</span>
          <span className="text-neutral-400">
            {isUnlocked 
              ? `Unlocked on ${new Date(achievement.unlockedAt).toLocaleDateString()}` 
              : `${achievement.progress}% complete`}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string,
    category: PropTypes.string,
    progress: PropTypes.number.isRequired,
    unlockedAt: PropTypes.string,
    rarity: PropTypes.string,
    xpReward: PropTypes.number,
  }).isRequired,
};

export default AchievementCard;
