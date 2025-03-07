import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ProgressHub = () => {
  const [activeGoals, setActiveGoals] = useState(new Array(28).fill(false));

  useEffect(() => {
    const animateGoals = () => {
      setActiveGoals(new Array(28).fill(false));
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < 28) {
          setActiveGoals((prev) => {
            const newGoals = [...prev];
            newGoals[currentIndex] = true;
            return newGoals;
          });
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    };

    animateGoals();
  }, []);

  const recentAchievements = [
    {
      title: "Morning Workout",
      category: "Fitness",
      points: "+500 pts",
      iconColor: "from-[#00F0FF] to-[#FF006F]",
    },
    {
      title: "Reading Goal",
      category: "Personal Development",
      points: "+1000 pts",
      iconColor: "from-[#FFD700] to-[#FFA500]",
    },
  ];

  const progressStats = [
    { label: "Daily Goals", progress: 80 },
    { label: "Weekly Challenge", progress: 65 },
  ];

  return (
    <section id="progress-hub-preview" className="py-20 bg-[#090909]">
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
              Progress Hub
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Track your journey, celebrate milestones, and stay motivated with
            real-time progress insights
          </p>
        </motion.div>

        {/* Progress Dashboard Preview */}
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
                AM
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-white">Alex Morgan</h3>
                <p className="text-[#B4B4B4]">Goal Achiever</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">245</div>
                <div className="text-[#B4B4B4]">Goals Met</div>
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

          {/* Progress Visualization */}
          <div className="mb-12">
            <h4 className="text-white font-semibold mb-4">Goal History</h4>
            <div className="bg-neutral-900/50 p-6 rounded-xl">
              <div className="grid grid-cols-7 gap-2">
                {activeGoals.map((active, index) => (
                  <motion.div
                    key={index}
                    className="w-6 h-6 rounded-sm transition-all duration-300"
                    style={{
                      background: active
                        ? "linear-gradient(45deg, rgba(0, 240, 255, 0.8), rgba(255, 0, 111, 0.8))"
                        : "#1e1e1e",
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-white font-semibold">
                          {achievement.title}
                        </div>
                        <div className="text-[#B4B4B4] text-sm">
                          {achievement.category}
                        </div>
                      </div>
                    </div>
                    <div className="text-[#FFD700]">{achievement.points}</div>
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

export default ProgressHub;
