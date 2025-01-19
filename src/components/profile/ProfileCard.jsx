import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ProfileCard = ({ userData, onShare }) => {
  // Function to generate gradient avatar with initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const socialButtons = [
    {
      platform: "twitter",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      label: "Share on Twitter",
      hoverColor: "hover:text-[#1DA1F2]",
    },
    {
      platform: "linkedin",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: "Share on LinkedIn",
      hoverColor: "hover:text-[#0A66C2]",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111111] rounded-xl border border-neutral-800 overflow-hidden"
    >
      {/* Profile Header with Gradient Background */}
      <div className="h-32 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] relative">
        <div className="absolute -bottom-16 left-6">
          <div className="w-32 h-32 rounded-full border-4 border-[#111111] bg-neutral-900 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {getInitials(userData.username)}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {userData.username}
          </h2>
          <p className="text-neutral-400">{userData.email}</p>
          <p className="text-sm text-neutral-500 mt-1">
            Member since {userData.joinDate}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-neutral-900/50 rounded-lg p-4">
            <p className="text-sm text-neutral-400 mb-1">Achievement Rate</p>
            <p className="text-2xl font-bold text-[#00F0FF]">
              {userData.stats.completionRate}%
            </p>
          </div>
          <div className="bg-neutral-900/50 rounded-lg p-4">
            <p className="text-sm text-neutral-400 mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-[#FF006F]">
              {userData.stats.currentStreak} days
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-400">Goals Progress</span>
            <span className="text-white">
              {userData.goals.completed}/{userData.goals.total}
            </span>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(userData.goals.completed / userData.goals.total) * 100}%`,
              }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F]"
            />
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="border-t border-neutral-800 pt-6">
          <p className="text-sm text-neutral-400 mb-4">Share your profile</p>
          <div className="flex gap-4">
            {socialButtons.map((button) => (
              <motion.button
                key={button.platform}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onShare(button.platform)}
                className={`flex-1 py-2 rounded-lg border border-neutral-800
                  text-neutral-400 ${button.hoverColor} transition-colors duration-300
                  hover:border-neutral-700 flex items-center justify-center gap-2`}
              >
                {button.icon}
                <span className="text-sm font-medium">Share</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ProfileCard.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    joinDate: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      completionRate: PropTypes.number.isRequired,
      currentStreak: PropTypes.number.isRequired,
    }).isRequired,
    goals: PropTypes.shape({
      completed: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onShare: PropTypes.func.isRequired,
};

export default ProfileCard;
