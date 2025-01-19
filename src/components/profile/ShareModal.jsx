import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import html2canvas from "html2canvas";

const ShareModal = ({ isOpen, onClose, userData, onShare }) => {
  const shareCardRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleShareClick = async (platform) => {
    try {
      // Generate image from the share card
      const canvas = await html2canvas(shareCardRef.current);
      const imageUrl = canvas.toDataURL("image/png");

      // Call the share function
      onShare(platform, imageUrl);
      onClose();
    } catch (error) {
      console.error("Error generating share image:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#111111] rounded-xl w-full max-w-lg border border-neutral-800 shadow-xl">
              <div className="p-6 border-b border-neutral-800">
                <h2 className="text-xl font-bold text-white">Share Profile</h2>
              </div>

              {/* Share Card Preview */}
              <div className="p-6">
                <div
                  ref={shareCardRef}
                  className="bg-[#111111] rounded-xl border border-neutral-800 p-6 mb-6"
                >
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {userData.username.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {userData.username}
                      </h3>
                      <p className="text-neutral-400">Gaming Profile</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-900/50 rounded-lg p-4">
                      <p className="text-sm text-neutral-400 mb-1">
                        Achievements
                      </p>
                      <p className="text-2xl font-bold text-[#00F0FF]">
                        {userData.stats.achievementsCompleted}
                      </p>
                    </div>
                    <div className="bg-neutral-900/50 rounded-lg p-4">
                      <p className="text-sm text-neutral-400 mb-1">
                        Current Streak
                      </p>
                      <p className="text-2xl font-bold text-[#FF006F]">
                        {userData.stats.currentStreak} days
                      </p>
                    </div>
                    <div className="bg-neutral-900/50 rounded-lg p-4">
                      <p className="text-sm text-neutral-400 mb-1">
                        Total Points
                      </p>
                      <p className="text-2xl font-bold text-[#FFD700]">
                        {userData.stats.totalPoints.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-neutral-900/50 rounded-lg p-4">
                      <p className="text-sm text-neutral-400 mb-1">
                        Completion Rate
                      </p>
                      <p className="text-2xl font-bold text-[#00F0FF]">
                        {userData.stats.completionRate}%
                      </p>
                    </div>
                  </div>

                  {/* Commit.gg Watermark */}
                  <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
                    <p className="text-neutral-400 text-sm">
                      View my gaming profile on{" "}
                      <span className="font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
                        Commit.gg
                      </span>
                    </p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleShareClick("twitter")}
                    className="flex-1 py-3 rounded-lg bg-[#1DA1F2] text-white font-medium
                      hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Share on Twitter
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleShareClick("linkedin")}
                    className="flex-1 py-3 rounded-lg bg-[#0A66C2] text-white font-medium
                      hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Share on LinkedIn
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

ShareModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      achievementsCompleted: PropTypes.number.isRequired,
      currentStreak: PropTypes.number.isRequired,
      totalPoints: PropTypes.number.isRequired,
      completionRate: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onShare: PropTypes.func.isRequired,
};

export default ShareModal;
