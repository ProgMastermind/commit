import { motion } from "framer-motion";

const achievements = [
  {
    category: "Fitness",
    title: "Workout Warrior",
    timestamp: "2 hours ago",
    xp: "+500 XP",
    icon: "💪",
  },
  {
    category: "Reading",
    title: "Book Enthusiast",
    timestamp: "5 hours ago",
    xp: "+750 XP",
    icon: "📚",
  },
  {
    category: "Productivity",
    title: "Focus Master",
    timestamp: "8 hours ago",
    xp: "+300 XP",
    icon: "⏱️",
  },
];

const RecentAchievements = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 h-full"
    >
      <div className="flex items-center justify-between p-6 border-b border-neutral-800/50">
        <h2 className="text-xl font-bold text-white">Recent Achievements</h2>
        <button className="text-sm text-[#00F0FF] hover:text-[#FF006F] transition-colors">
          View All
        </button>
      </div>

      <div className="p-6 space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-neutral-800/30 rounded-xl
              hover:bg-neutral-800/50 transition-all duration-300 border border-neutral-700/30
              hover:border-neutral-700/50 group"
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                flex items-center justify-center text-2xl shadow-lg group-hover:shadow-[#00F0FF]/20
                transition-all duration-300"
              >
                {achievement.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-[#00F0FF] transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-sm text-neutral-400">
                  {achievement.category} • {achievement.timestamp}
                </p>
              </div>
            </div>
            <div className="text-[#00F0FF] font-semibold px-3 py-1 bg-[#00F0FF]/10 rounded-full">
              {achievement.xp}
            </div>
          </motion.div>
        ))}

        {/* Category Breakdown */}
        <div className="mt-6 pt-6 border-t border-neutral-800/50">
          <h3 className="text-sm font-medium text-neutral-300 mb-4">
            Category Breakdown
          </h3>
          <div className="space-y-3">
            {[
              {
                category: "Fitness",
                percentage: 45,
                color: "from-red-500 to-orange-500",
              },
              {
                category: "Reading",
                percentage: 30,
                color: "from-emerald-500 to-teal-500",
              },
              {
                category: "Productivity",
                percentage: 15,
                color: "from-[#00F0FF] to-blue-500",
              },
              {
                category: "Learning",
                percentage: 10,
                color: "from-violet-500 to-purple-500",
              },
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">{item.category}</span>
                  <span className="text-white">{item.percentage}%</span>
                </div>
                <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentAchievements;
