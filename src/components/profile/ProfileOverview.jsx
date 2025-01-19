import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ProfileOverview = ({ userData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111111] rounded-xl border border-neutral-800 p-6"
    >
      {/* Profile Avatar/Initials */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="h-20 w-20 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
          flex items-center justify-center text-2xl font-bold text-white"
        >
          {userData.username.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{userData.username}</h2>
          <p className="text-neutral-400">Member since {userData.joinDate}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-neutral-400 text-sm mb-1">Total Points</p>
          <p className="text-2xl font-bold text-[#00F0FF]">
            {userData.totalPoints.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-neutral-400 text-sm mb-1">Current Streak</p>
          <p className="text-2xl font-bold text-[#FF006F]">
            {userData.currentStreak} days
          </p>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-neutral-400 text-sm mb-1">Longest Streak</p>
          <p className="text-2xl font-bold text-[#FFD700]">
            {userData.longestStreak} days
          </p>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-neutral-400 text-sm mb-1">Completion Rate</p>
          <p className="text-2xl font-bold text-[#00F0FF]">
            {Math.round(
              (userData.achievements.completed / userData.achievements.total) *
                100,
            )}
            %
          </p>
        </div>
      </div>
    </motion.div>
  );
};

ProfileOverview.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    joinDate: PropTypes.string.isRequired,
    totalPoints: PropTypes.number.isRequired,
    currentStreak: PropTypes.number.isRequired,
    longestStreak: PropTypes.number.isRequired,
    achievements: PropTypes.shape({
      total: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProfileOverview;
