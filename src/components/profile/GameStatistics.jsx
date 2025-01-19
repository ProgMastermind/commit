import { motion } from "framer-motion";
import PropTypes from "prop-types";

const GameStatistics = ({ userData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111111] rounded-xl border border-neutral-800 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Game Statistics</h2>

      <div className="space-y-4">
        {userData.games.map((game, index) => (
          <motion.div
            key={game.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-neutral-900/50 rounded-lg border border-neutral-800
              hover:border-[#00F0FF] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                  flex items-center justify-center text-2xl"
                >
                  {game.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{game.name}</h3>
                  <p className="text-sm text-neutral-400">
                    {game.completed} of {game.achievements} achievements
                  </p>
                </div>
              </div>
              <div className="text-[#00F0FF] font-semibold">
                {Math.round((game.completed / game.achievements) * 100)}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(game.completed / game.achievements) * 100}%`,
                }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

GameStatistics.propTypes = {
  userData: PropTypes.shape({
    games: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        achievements: PropTypes.number.isRequired,
        completed: PropTypes.number.isRequired,
        icon: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default GameStatistics;
