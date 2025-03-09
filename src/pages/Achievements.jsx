import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tab } from "@headlessui/react";
import confetti from "canvas-confetti";

// Rarity colors for achievement styling
const rarityColors = {
  common: {
    bg: "from-blue-500/20 to-green-500/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
    progress: "bg-gradient-to-r from-blue-500 to-green-500",
  },
  uncommon: {
    bg: "from-cyan-500/20 to-purple-500/20",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    progress: "bg-gradient-to-r from-cyan-500 to-purple-500",
  },
  rare: {
    bg: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
    progress: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  legendary: {
    bg: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    text: "text-amber-400",
    progress: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
};

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  useEffect(() => {
    if (showConfetti) {
      triggerConfetti();
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const fetchAchievements = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/achievements", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }

      const data = await response.json();
      setAchievements(data.data || []);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredAchievements = () => {
    return achievements.filter((achievement) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "unlocked" && achievement.unlockedAt) ||
        (filter === "in-progress" && !achievement.unlockedAt) ||
        achievement.category === filter;

      const matchesSearch =
        !searchQuery ||
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00F0FF", "#FF006F", "#FFD700"],
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section with Decorative Elements */}
      <header className="relative">
        {/* Decorative gradient orb */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF006F]/20 rounded-full blur-3xl opacity-50" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
                Your Achievements
              </h1>
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-0 h-0.5 w-20 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full"></div>
            </div>

            <p className="text-neutral-400 mt-4">
              Track your progress and celebrate your wins
            </p>
          </motion.div>
        </div>
      </header>

      {/* Achievement Grid */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00F0FF]"></div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-500/10 rounded-xl border border-red-500/20">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchAchievements}
              className="mt-4 px-4 py-2 bg-neutral-800 rounded-lg text-white hover:bg-neutral-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : getFilteredAchievements().length === 0 ? (
          <div className="text-center p-8 bg-neutral-800/50 rounded-xl border border-neutral-700/50">
            <p className="text-neutral-400">No achievements found</p>
            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="mt-4 px-4 py-2 bg-neutral-800 rounded-lg text-white hover:bg-neutral-700 transition-colors"
              >
                View All Achievements
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredAchievements().map((achievement) => (
              <motion.div
                key={achievement._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedAchievement(achievement);
                  if (achievement.unlockedAt && !showConfetti) {
                    setShowConfetti(true);
                  }
                }}
                className={`bg-[#111111] rounded-xl p-6 border ${
                  rarityColors[achievement.rarity || "common"].border
                } hover:border-[#00F0FF] transition-all duration-300 relative overflow-hidden cursor-pointer`}
              >
                {/* Background gradient based on rarity */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    rarityColors[achievement.rarity || "common"].bg
                  } opacity-20`}
                ></div>

                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-xl">
                      {achievement.icon || "🏆"}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-white">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-neutral-400">
                        {achievement.category}
                      </p>
                    </div>
                  </div>
                  {achievement.xpReward && (
                    <span className="text-[#FFD700] font-bold">
                      +{achievement.xpReward} XP
                    </span>
                  )}
                </div>

                <p className="text-neutral-300 text-sm mb-4">
                  {achievement.description}
                </p>

                <div className="space-y-2">
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        rarityColors[achievement.rarity || "common"].progress
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span
                      className={`${
                        rarityColors[achievement.rarity || "common"].text
                      } font-medium capitalize`}
                    >
                      {achievement.rarity || "common"}
                    </span>
                    <span className="text-neutral-400">
                      {achievement.unlockedAt
                        ? `Unlocked on ${new Date(
                            achievement.unlockedAt
                          ).toLocaleDateString()}`
                        : `${achievement.progress}% complete`}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setSelectedAchievement(null)}
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
                <div className="relative p-6 border-b border-neutral-700/50">
                  {/* Decorative element */}
                  <div className="absolute -top-24 left-0 w-40 h-40 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF006F]/20 rounded-full blur-3xl opacity-50" />

                  <div className="relative flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                      Achievement Details
                    </h2>
                    <button
                      onClick={() => setSelectedAchievement(null)}
                      className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-16 w-16 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${
                        rarityColors[selectedAchievement.rarity || "common"].bg
                      } ${
                        rarityColors[selectedAchievement.rarity || "common"]
                          .border
                      }`}
                    >
                      {selectedAchievement.icon || "🏆"}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {selectedAchievement.title}
                      </h3>
                      <p
                        className={`${
                          rarityColors[selectedAchievement.rarity || "common"]
                            .text
                        } capitalize`}
                      >
                        {selectedAchievement.rarity || "common"} •{" "}
                        {selectedAchievement.category}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-400 mb-1">
                        Description
                      </h4>
                      <p className="text-white">
                        {selectedAchievement.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-neutral-400 mb-1">
                        Reward
                      </h4>
                      <p className="text-[#FFD700] font-bold">
                        +{selectedAchievement.xpReward} XP
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-neutral-400 mb-1">
                        Progress
                      </h4>
                      <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            rarityColors[
                              selectedAchievement.rarity || "common"
                            ].progress
                          }`}
                          style={{ width: `${selectedAchievement.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-sm text-neutral-400 mt-1">
                        {selectedAchievement.progress}% complete
                      </p>
                    </div>

                    {selectedAchievement.unlockedAt && (
                      <div>
                        <h4 className="text-sm font-medium text-neutral-400 mb-1">
                          Unlocked On
                        </h4>
                        <p className="text-white">
                          {new Date(
                            selectedAchievement.unlockedAt
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Achievements;
