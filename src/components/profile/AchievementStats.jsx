import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AchievementStats = ({ userData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111111] rounded-xl border border-neutral-800 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Achievement Stats</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-neutral-400 text-sm mb-1">Total Achievements</p>
          <p className="text-2xl font-bold text-[#00F0FF]">
            {userData.achievements.total}
          </p>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-neutral-400 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold text-[#FF006F]">
            {userData.achievements.completed}
          </p>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-neutral-400 text-sm mb-1">Completion Rate</p>
          <p className="text-2xl font-bold text-[#FFD700]">
            {Math.round(
              (userData.achievements.completed / userData.achievements.total) *
                100,
            )}
            %
          </p>
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Achievements
        </h3>
        <div className="space-y-4">
          {userData.achievements.recent.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-neutral-900/50 rounded-lg
                border border-neutral-800 hover:border-[#00F0FF] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                  flex items-center justify-center text-2xl"
                >
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-neutral-400">
                    {achievement.game} • {achievement.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

AchievementStats.propTypes = {
  userData: PropTypes.shape({
    achievements: PropTypes.shape({
      total: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
      recent: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          game: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          icon: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AchievementStats;
