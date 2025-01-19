import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AchievementCard = ({ achievement }) => {
  const isValidDate = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111111] rounded-xl p-6 border border-neutral-800
        hover:border-[#00F0FF] transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center">
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
            <h3 className="font-semibold text-white">{achievement.goalName}</h3>
            <p className="text-sm text-neutral-400">{achievement.gameName}</p>
          </div>
        </div>
        {achievement.points && (
          <span className="text-[#FFD700] font-bold">
            +{achievement.points} XP
          </span>
        )}
      </div>

      <div className="space-y-2">
        {isValidDate(achievement.completedAt || achievement.updatedAt) && (
          <div className="flex justify-between text-sm">
            <span className="text-neutral-400">Completed</span>
            <span className="text-white">
              {new Date(
                achievement.completedAt || achievement.updatedAt,
              ).toLocaleDateString()}
            </span>
          </div>
        )}
        {achievement.isGroupGoal && (
          <div className="flex justify-between text-sm">
            <span className="text-neutral-400">Group</span>
            <span className="text-[#00F0FF]">{achievement.groupName}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    goalName: PropTypes.string.isRequired,
    gameName: PropTypes.string.isRequired,
    points: PropTypes.number,
    completedAt: PropTypes.string,
    updatedAt: PropTypes.string,
    isGroupGoal: PropTypes.bool,
    groupName: PropTypes.string,
  }).isRequired,
};

export default AchievementCard;
