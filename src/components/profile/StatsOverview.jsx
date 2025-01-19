import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const StatsOverview = ({ stats }) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalPoints: 0,
    tokens: 0,
    achievementsCompleted: 0,
  });

  // Animate numbers counting up
  useEffect(() => {
    const duration = 1500; // Animation duration in milliseconds
    const steps = 60; // Number of steps in the animation
    const interval = duration / steps;

    const incrementValues = {
      totalPoints: stats.totalPoints / steps,
      tokens: stats.tokens / steps,
      achievementsCompleted: stats.achievementsCompleted / steps,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep >= steps) {
        setAnimatedStats({
          totalPoints: stats.totalPoints,
          tokens: stats.tokens,
          achievementsCompleted: stats.achievementsCompleted,
        });
        clearInterval(timer);
        return;
      }

      setAnimatedStats((prev) => ({
        totalPoints: Math.min(
          Math.round(prev.totalPoints + incrementValues.totalPoints),
          stats.totalPoints,
        ),
        tokens: Math.min(
          Math.round(prev.tokens + incrementValues.tokens),
          stats.tokens,
        ),
        achievementsCompleted: Math.min(
          Math.round(
            prev.achievementsCompleted + incrementValues.achievementsCompleted,
          ),
          stats.achievementsCompleted,
        ),
      }));

      currentStep++;
    }, interval);

    return () => clearInterval(timer);
  }, [stats]);

  const statCards = [
    {
      title: "Total Points",
      value: animatedStats.totalPoints.toLocaleString(),
      icon: "🏆",
      gradient: "from-[#00F0FF] to-[#FF006F]",
    },
    {
      title: "Available Tokens",
      value: animatedStats.tokens.toLocaleString(),
      icon: "💎",
      gradient: "from-[#FFD700] to-[#FFA500]",
    },
    {
      title: "Achievements",
      value: `${animatedStats.achievementsCompleted}/${stats.totalAchievements}`,
      icon: "🎮",
      gradient: "from-[#00F0FF] to-[#FF006F]",
    },
    {
      title: "Longest Streak",
      value: `${stats.longestStreak} Days`,
      icon: "🔥",
      gradient: "from-[#FFD700] to-[#FFA500]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#111111] rounded-xl border border-neutral-800 p-6
            hover:border-[#00F0FF] transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient}
                flex items-center justify-center text-2xl`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-neutral-400 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

StatsOverview.propTypes = {
  stats: PropTypes.shape({
    totalPoints: PropTypes.number.isRequired,
    tokens: PropTypes.number.isRequired,
    achievementsCompleted: PropTypes.number.isRequired,
    totalAchievements: PropTypes.number.isRequired,
    longestStreak: PropTypes.number.isRequired,
  }).isRequired,
};

export default StatsOverview;
