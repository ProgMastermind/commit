import { motion } from "framer-motion";

const UserDashboard = () => {
  // Helper function to generate achievement squares
  const generateAchievementSquares = () => {
    return Array(28)
      .fill(null)
      .map((_, index) => {
        const intensity = Math.floor(Math.random() * 5);
        return {
          id: index,
          level: intensity,
        };
      });
  };

  const recentAchievements = [
    {
      title: "First Blood",
      game: "PUBG",
      xp: "+500 XP",
      iconColor: "from-[#00F0FF] to-[#FF006F]",
    },
    {
      title: "Victory Royale",
      game: "Free Fire",
      xp: "+1000 XP",
      iconColor: "from-[#FFD700] to-[#FFA500]",
    },
  ];

  const progressStats = [
    { label: "Daily Goals", progress: 80 },
    { label: "Weekly Challenge", progress: 65 },
  ];

  return (
    <section id="user-dashboard-preview" className="py-20 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Personal{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              Achievement Hub
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Track your progress, monitor achievements, and analyze your gaming
            journey
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          className="bg-[#111111] rounded-2xl border border-neutral-800 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-white">John Doe</h3>
                <p className="text-[#B4B4B4]">Elite Gamer</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">245</div>
                <div className="text-[#B4B4B4]">Achievements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00F0FF]">15</div>
                <div className="text-[#B4B4B4]">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF006F]">5.2K</div>
                <div className="text-[#B4B4B4]">Points</div>
              </div>
            </div>
          </div>

          {/* Achievement Graph */}
          <div className="mb-12">
            <h4 className="text-white font-semibold mb-4">
              Achievement History
            </h4>
            <div className="bg-neutral-900/50 p-6 rounded-xl">
              <div className="grid grid-cols-7 gap-2">
                {generateAchievementSquares().map((square) => (
                  <motion.div
                    key={square.id}
                    className={`w-6 h-6 rounded-sm transition-all duration-300 hover:scale-110 cursor-pointer`}
                    style={{
                      background:
                        square.level === 0
                          ? "#1e1e1e"
                          : `linear-gradient(45deg, rgba(0, 240, 255, ${square.level * 0.2}), rgba(255, 0, 111, ${square.level * 0.2}))`,
                    }}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Achievements and Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Achievements */}
            <div className="bg-neutral-900/50 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-4">
                Recent Achievements
              </h4>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#111111] rounded-lg border border-neutral-800"
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-lg bg-gradient-to-r ${achievement.iconColor} flex items-center justify-center`}
                      >
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-white font-semibold">
                          {achievement.title}
                        </div>
                        <div className="text-[#B4B4B4] text-sm">
                          {achievement.game}
                        </div>
                      </div>
                    </div>
                    <div className="text-[#FFD700]">{achievement.xp}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Stats */}
            <div className="bg-neutral-900/50 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-4">
                Progress Overview
              </h4>
              <div className="space-y-6">
                {progressStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#E5E4E2]">{stat.label}</span>
                      <span className="text-[#00F0FF]">{stat.progress}%</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UserDashboard;
