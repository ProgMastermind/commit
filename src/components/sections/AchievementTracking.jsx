import { motion } from "framer-motion";

const AchievementTracking = () => {
  const gameCards = [
    {
      title: "PUBG",
      percentage: 87,
      completed: "52/60",
      recentUnlocks: "+3 Today",
    },
    {
      title: "League of Legends",
      percentage: 65,
      completed: "39/60",
      recentUnlocks: "+5 Today",
    },
    {
      title: "Free Fire",
      percentage: 92,
      completed: "55/60",
      recentUnlocks: "+2 Today",
    },
  ];

  const stats = [
    { value: "146", label: "Total Achievements" },
    { value: "10", label: "Achievements Today" },
    { value: "81%", label: "Average Completion" },
  ];

  return (
    <section id="achievement-tracking" className="py-20 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Multi-Platform{" "}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
              Achievement Tracking
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Track your achievements across multiple games
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gameCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-[#111111] rounded-xl p-6 border border-neutral-800 group hover:border-[#FFD700] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <div className="text-[#FFD700]">
                  <span className="text-2xl font-bold">{card.percentage}</span>
                  <span className="text-sm">%</span>
                </div>
              </div>

              <div className="bg-neutral-800 h-2 rounded-full mb-4">
                <motion.div
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${card.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[#E5E4E2]">
                  <span>Achievements Completed</span>
                  <span>{card.completed}</span>
                </div>
                <div className="flex justify-between text-[#E5E4E2]">
                  <span>Recent Unlocks</span>
                  <span className="text-[#00F0FF]">{card.recentUnlocks}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-[#111111] rounded-xl p-8 text-center border border-neutral-800 hover:border-[#00F0FF] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text mb-2">
                {stat.value}
              </div>
              <div className="text-[#B4B4B4]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementTracking;
