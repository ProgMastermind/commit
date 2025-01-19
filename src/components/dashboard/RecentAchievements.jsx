import { motion } from "framer-motion";

const achievements = [
  {
    game: "PUBG",
    title: "Victory Royale",
    timestamp: "2 hours ago",
    xp: "+500 XP",
    icon: "🏆",
  },
  {
    game: "League of Legends",
    title: "Pentakill Master",
    timestamp: "5 hours ago",
    xp: "+750 XP",
    icon: "⚔️",
  },
  {
    game: "Free Fire",
    title: "Survival Expert",
    timestamp: "8 hours ago",
    xp: "+300 XP",
    icon: "🎯",
  },
];

const RecentAchievements = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111111] rounded-xl border border-neutral-800"
    >
      <div className="p-6 border-b border-neutral-800">
        <h2 className="text-xl font-bold text-white">Recent Achievements</h2>
      </div>
      <div className="p-6 space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-neutral-900/50 rounded-lg hover:bg-neutral-800/50 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-2xl">
                {achievement.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {achievement.title}
                </h3>
                <p className="text-sm text-neutral-400">
                  {achievement.game} • {achievement.timestamp}
                </p>
              </div>
            </div>
            <div className="text-[#00F0FF] font-semibold">{achievement.xp}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentAchievements;
