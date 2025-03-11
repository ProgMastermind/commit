import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const rarityColors = {
  common: {
    bg: "from-blue-500/20 to-green-500/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
    progress: "bg-gradient-to-r from-blue-500 to-green-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]"
  },
  uncommon: {
    bg: "from-cyan-500/20 to-purple-500/20",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    progress: "bg-gradient-to-r from-cyan-500 to-purple-500",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.5)]"
  },
  rare: {
    bg: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
    progress: "bg-gradient-to-r from-purple-500 to-pink-500",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.5)]"
  },
  legendary: {
    bg: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    text: "text-amber-400",
    progress: "bg-gradient-to-r from-amber-500 to-orange-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.5)]"
  },
};

const AchievementCard = ({ achievement, isNew = false }) => {
  const [showAnimation, setShowAnimation] = useState(isNew);
  const [progressValue, setProgressValue] = useState(0);
  
  // Handle both backend and frontend data structures
  const isUnlocked = achievement.unlockedAt || (achievement.unlocked === true);
  const rarity = achievement.rarity || "common";
  const rarityStyle = rarityColors[rarity];
  
  // Ensure progress is a number between 0-100
  const progress = typeof achievement.progressPercentage === 'number' 
    ? Math.min(100, Math.max(0, achievement.progressPercentage)) 
    : typeof achievement.progress === 'number' && achievement.criteria?.threshold
      ? Math.min(100, Math.max(0, Math.round((achievement.progress / achievement.criteria.threshold) * 100)))
      : isUnlocked ? 100 : 0;

  // Format date if available
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      // Check if date is today
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      }
      // Check if date is yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      }
      return date.toLocaleDateString();
    } catch (e) {
      return '';
    }
  };
  
  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(progress);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [progress]);
  
  // Reset animation after it plays
  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: showAnimation && isUnlocked ? [1, 1.05, 1] : 1,
      }}
      transition={{ 
        duration: 0.4,
        scale: { duration: 0.5, repeat: 0 }
      }}
      className={`bg-[#111111] rounded-xl p-6 border ${rarityStyle.border}
        hover:border-[#00F0FF] transition-all duration-300 relative overflow-hidden
        ${showAnimation && isUnlocked ? rarityStyle.glow : ''}`}
    >
      {/* Background gradient based on rarity */}
      <div className={`absolute inset-0 bg-gradient-to-br ${rarityStyle.bg} opacity-20`}></div>
      
      {/* Locked overlay for locked achievements */}
      {!isUnlocked && progress === 0 && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-10">
          <div className="text-4xl opacity-70">🔒</div>
        </div>
      )}
      
      {/* "New" badge for newly unlocked achievements */}
      {showAnimation && isUnlocked && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20"
        >
          NEW!
        </motion.div>
      )}
      
      <div className="relative flex items-start justify-between mb-4 z-10">
        <div className="flex items-center">
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-2xl
            ${isUnlocked 
              ? 'bg-gradient-to-r from-[#00F0FF] to-[#FF006F]' 
              : 'bg-neutral-800 text-neutral-500'}`}>
            {achievement.icon || "🏆"}
          </div>
          <div className="ml-4">
            <h3 className={`font-semibold ${isUnlocked ? 'text-white' : 'text-neutral-500'}`}>
              {achievement.title}
            </h3>
            <p className="text-sm text-neutral-400">{achievement.category}</p>
          </div>
        </div>
        {achievement.xpReward && (
          <span className={`font-bold ${isUnlocked ? 'text-[#FFD700]' : 'text-neutral-500'}`}>
            +{achievement.xpReward} XP
          </span>
        )}
      </div>

      <p className={`text-sm mb-4 z-10 relative ${isUnlocked ? 'text-neutral-300' : 'text-neutral-500'}`}>
        {achievement.description}
      </p>

      <div className="space-y-2 relative z-10">
        {/* Progress bar */}
        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressValue}%` }}
            transition={{ duration: 1 }}
            className={`h-full ${isUnlocked ? rarityStyle.progress : 'bg-neutral-700'}`}
          ></motion.div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className={`${isUnlocked ? rarityStyle.text : 'text-neutral-500'} font-medium capitalize`}>
            {rarity}
          </span>
          <span className={isUnlocked ? 'text-neutral-400' : 'text-neutral-500'}>
            {isUnlocked 
              ? `Unlocked ${formatDate(achievement.unlockedAt)}` 
              : progress > 0 
                ? `${progress}% complete` 
                : 'Locked'}
          </span>
        </div>
      </div>
      
      {/* Celebration particles for newly unlocked achievements */}
      {showAnimation && isUnlocked && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-400"
              initial={{ 
                x: '50%', 
                y: '50%', 
                opacity: 1 
              }}
              animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`, 
                opacity: 0 
              }}
              transition={{ 
                duration: 1.5, 
                delay: Math.random() * 0.5,
                ease: "easeOut" 
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string,
    category: PropTypes.string,
    rarity: PropTypes.string,
    xpReward: PropTypes.number,
    progress: PropTypes.number,
    progressPercentage: PropTypes.number,
    unlocked: PropTypes.bool,
    unlockedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    criteria: PropTypes.shape({
      threshold: PropTypes.number,
      type: PropTypes.string
    })
  }).isRequired,
  isNew: PropTypes.bool
};

export default AchievementCard;
