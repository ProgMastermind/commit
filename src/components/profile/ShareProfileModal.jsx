// ShareProfileModal.jsx - A component for sharing user profiles
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";

const ShareProfileModal = ({ isOpen, onClose, userData }) => {
  const [shareMethod, setShareMethod] = useState("link"); // link, twitter, facebook, etc.

  if (!userData) return null;

  const shareLink = `https://commit.app/profile/${userData.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      // Success notification logic would go here
      alert("Link copied to clipboard!");
    });
  };

  const shareViaTwitter = () => {
    const text = `Check out my accountability profile on CommiT! I'm Level ${userData.level} with a ${userData.currentStreak} day streak! 🚀`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareLink)}`;
    window.open(url, "_blank");
  };

  const shareViaFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-800/80 to-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]">
              {/* Header */}
              <div className="p-6 border-b border-neutral-700/50">
                <h2 className="text-xl font-bold text-white">
                  Share Your Profile
                </h2>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Profile Preview */}
                <div className="bg-neutral-900/60 border border-neutral-800/70 rounded-xl p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {userData.username.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {userData.username}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="text-xs px-1.5 py-0.5 bg-[#00F0FF]/20 text-[#00F0FF] rounded-md">
                          Level {userData.level}
                        </div>
                        <div className="text-xs px-1.5 py-0.5 bg-[#FF006F]/20 text-[#FF006F] rounded-md flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {userData.currentStreak} Days
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-neutral-800/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-neutral-500">Goals</p>
                      <p className="text-sm font-bold text-white">
                        {userData.stats.goalsCompleted}
                      </p>
                    </div>
                    <div className="bg-neutral-800/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-neutral-500">Achievements</p>
                      <p className="text-sm font-bold text-white">
                        {userData.stats.achievementsUnlocked}
                      </p>
                    </div>
                    <div className="bg-neutral-800/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-neutral-500">Success</p>
                      <p className="text-sm font-bold text-[#00F0FF]">
                        {userData.stats.averageCompletionRate}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sharing Options */}
                <div>
                  <div className="flex bg-neutral-900/60 border border-neutral-800/70 rounded-xl p-1 mb-4">
                    <button
                      onClick={() => setShareMethod("link")}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          shareMethod === "link"
                            ? "bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 text-white"
                            : "text-neutral-400 hover:text-white"
                        }`}
                    >
                      Link
                    </button>
                    <button
                      onClick={() => setShareMethod("social")}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          shareMethod === "social"
                            ? "bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 text-white"
                            : "text-neutral-400 hover:text-white"
                        }`}
                    >
                      Social Media
                    </button>
                  </div>

                  {shareMethod === "link" ? (
                    <div className="space-y-4">
                      <div className="flex">
                        <input
                          type="text"
                          value={shareLink}
                          readOnly
                          className="flex-1 px-4 py-3 rounded-l-lg bg-neutral-800/50 border border-neutral-700/50 border-r-0
                            text-white placeholder-neutral-500 focus:outline-none"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="px-4 py-3 rounded-r-lg bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-black font-medium transition-all"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500">
                        Share this link with friends to let them view your
                        profile.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={shareViaTwitter}
                        className="py-3 px-4 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 rounded-lg text-white font-medium
                                                transition-all flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        Twitter
                      </button>

                      <button
                        onClick={shareViaFacebook}
                        className="py-3 px-4 bg-[#1877F2] hover:bg-[#1877F2]/90 rounded-lg text-white font-medium
                                                transition-all flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </button>

                      <button
                        onClick={() => {
                          const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`;
                          window.open(url, "_blank");
                        }}
                        className="py-3 px-4 bg-[#0077B5] hover:bg-[#0077B5]/90 rounded-lg text-white font-medium
                                                transition-all flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </button>

                      <button
                        onClick={() => {
                          const text = `Check out my progress on CommiT!`;
                          if (navigator.share) {
                            navigator.share({
                              title: "My CommiT Profile",
                              text: text,
                              url: shareLink,
                            });
                          } else {
                            // Fallback for browsers that don't support the Web Share API
                            copyToClipboard();
                          }
                        }}
                        className="py-3 px-4 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white font-medium
                                                transition-all flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        More Options
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-700/50 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700
                                          text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

ShareProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userData: PropTypes.object,
};

export default ShareProfileModal;
