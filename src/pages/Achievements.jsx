import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tab } from "@headlessui/react";
import confetti from "canvas-confetti";

// Mock achievement data until backend implementation
const mockAchievements = [
  {
    id: "1",
    title: "Early Bird",
    description: "Complete 5 morning goals before 8 AM",
    icon: "🌅",
    category: "consistency",
    progress: 100,
    unlockedAt: "2023-11-15T08:30:00Z",
    rarity: "common",
    xpReward: 100,
  },
  {
    id: "2",
    title: "Streak Master",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    category: "streaks",
    progress: 100,
    unlockedAt: "2023-11-10T18:45:00Z",
    rarity: "common",
    xpReward: 150,
  },
  {
    id: "3",
    title: "Knowledge Seeker",
    description: "Read 10 books",
    icon: "📚",
    category: "reading",
    progress: 80,
    unlockedAt: null,
    rarity: "uncommon",
    xpReward: 250,
  },
  {
    id: "4",
    title: "Fitness Enthusiast",
    description: "Complete 20 workout sessions",
    icon: "💪",
    category: "fitness",
    progress: 65,
    unlockedAt: null,
    rarity: "uncommon",
    xpReward: 300,
  },
  {
    id: "5",
    title: "Mindfulness Guru",
    description: "Meditate for 30 days in a row",
    icon: "🧘‍♂️",
    category: "wellness",
    progress: 40,
    unlockedAt: null,
    rarity: "rare",
    xpReward: 500,
  },
  {
    id: "6",
    title: "Social Butterfly",
    description: "Join 3 different accountability groups",
    icon: "🦋",
    category: "social",
    progress: 100,
    unlockedAt: "2023-12-01T12:15:00Z",
    rarity: "uncommon",
    xpReward: 200,
  },
  {
    id: "7",
    title: "Productivity Master",
    description: "Complete 50 goals",
    icon: "⚡",
    category: "productivity",
    progress: 72,
    unlockedAt: null,
    rarity: "rare",
    xpReward: 400,
  },
  {
    id: "8",
    title: "Night Owl",
    description: "Complete 10 goals after 10 PM",
    icon: "🦉",
    category: "consistency",
    progress: 100,
    unlockedAt: "2023-11-25T23:05:00Z",
    rarity: "common",
    xpReward: 100,
  },
  {
    id: "9",
    title: "Diamond Achiever",
    description: "Unlock 20 other achievements",
    icon: "💎",
    category: "meta",
    progress: 30,
    unlockedAt: null,
    rarity: "legendary",
    xpReward: 1000,
  },
  {
    id: "10",
    title: "Finance Wizard",
    description: "Complete 15 finance-related goals",
    icon: "💰",
    category: "finance",
    progress: 60,
    unlockedAt: null,
    rarity: "uncommon",
    xpReward: 300,
  },
  {
    id: "11",
    title: "Creative Genius",
    description: "Complete 10 creative projects",
    icon: "🎨",
    category: "creativity",
    progress: 90,
    unlockedAt: null,
    rarity: "uncommon",
    xpReward: 250,
  },
  {
    id: "12",
    title: "Team Player",
    description: "Help your group complete 5 shared goals",
    icon: "🤝",
    category: "social",
    progress: 100,
    unlockedAt: "2023-12-05T14:20:00Z",
    rarity: "common",
    xpReward: 150,
  },
];

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
    // Simulate API call
    setIsLoading(true);
    try {
      // In a real app, you'd fetch from your API
      // const response = await fetch("http://localhost:3001/api/achievements", {
      //   credentials: "include",
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to fetch achievements");
      // }

      // const data = await response.json();
      // setAchievements(data.data);

      // Using mock data for now
      setTimeout(() => {
        setAchievements(mockAchievements);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const filteredAchievements = achievements.filter((achievement) => {
    // Filter by unlocked/locked status
    if (filter === "unlocked" && !achievement.unlockedAt) return false;
    if (filter === "locked" && achievement.unlockedAt) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        achievement.title.toLowerCase().includes(query) ||
        achievement.description.toLowerCase().includes(query) ||
        achievement.category.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Calculate stats
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter((a) => a.unlockedAt).length;
  const totalXP = achievements
    .filter((a) => a.unlockedAt)
    .reduce((sum, a) => sum + a.xpReward, 0);
  const completionRate =
    totalAchievements > 0
      ? Math.round((unlockedAchievements / totalAchievements) * 100)
      : 0;

  // Group achievements by category for the tabs
  const categories = ["all", ...new Set(achievements.map((a) => a.category))];

  return (
    <div className="space-y-8">
      {/* Header Section with Decorative Elements */}
      <header className="relative">
        {/* Decorative gradient orb */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-50" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Achievements
              </h1>
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-0 h-0.5 w-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
            </div>

            <p className="text-neutral-400 mt-4">
              Track your progress and showcase your accomplishments
            </p>
          </motion.div>

          {/* Level Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-1 rounded-xl border border-purple-500/20"
          >
            <div className="bg-neutral-900/60 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                {Math.floor(totalXP / 1000) + 1}
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Current Level</p>
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold">
                    Level {Math.floor(totalXP / 1000) + 1}
                  </p>
                  <div className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">
                    {totalXP} XP
                  </div>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalXP % 1000) / 10}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <p className="text-sm font-medium text-neutral-500 mb-1">
              Total Achievements
            </p>
            <p className="text-3xl font-bold text-white">{totalAchievements}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <p className="text-sm font-medium text-neutral-500 mb-1">
              Unlocked
            </p>
            <p className="text-3xl font-bold text-white">
              {unlockedAchievements}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <p className="text-sm font-medium text-neutral-500 mb-1">
              Completion Rate
            </p>
            <p className="text-3xl font-bold text-white">{completionRate}%</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <p className="text-sm font-medium text-neutral-500 mb-1">
              Total XP Earned
            </p>
            <p className="text-3xl font-bold text-white">{totalXP}</p>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Status Filter */}
        <div className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-1 flex">
          {["all", "unlocked", "locked"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors
                ${
                  filter === filterType
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
            >
              {filterType}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50
              text-white placeholder-neutral-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
              transition-all duration-300"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="relative w-20 h-20">
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-neutral-800"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-500">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl"
        >
          <div className="flex gap-4 items-center">
            <div className="rounded-full bg-red-500/20 p-3 text-red-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">
                Error Loading Achievements
              </h3>
              <p className="text-neutral-400">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchAchievements}
            className="mt-4 ml-auto block px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Category Tabs and Achievement Grid */}
      {!isLoading && !error && (
        <div className="space-y-6">
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto py-2 px-1 bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50">
              {categories.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `py-2 px-4 text-sm font-medium rounded-lg capitalize transition-all min-w-max
                    ${
                      selected
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                    }`
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {categories.map((category, idx) => (
                <Tab.Panel
                  key={idx}
                  className="ring-white ring-opacity-10 ring-offset-neutral-900 focus:outline-none"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAchievements
                      .filter(
                        (achievement) =>
                          category === "all" ||
                          achievement.category === category,
                      )
                      .map((achievement) => {
                        const isUnlocked = achievement.unlockedAt !== null;
                        const rarityLevel = achievement.rarity || "common";
                        const colors = rarityColors[rarityLevel];

                        return (
                          <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            onClick={() => {
                              setSelectedAchievement(achievement);
                              if (isUnlocked && !showConfetti) {
                                setShowConfetti(true);
                              }
                            }}
                            className={`bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-xl
                              ${colors.border} p-6 relative overflow-hidden cursor-pointer transition-all
                              ${!isUnlocked ? "opacity-70 grayscale hover:grayscale-0 hover:opacity-90" : ""}
                              group`}
                          >
                            {/* Achievement Icon */}
                            <div className="mb-4 flex justify-between items-start">
                              <div
                                className="h-16 w-16 rounded-xl bg-gradient-to-br from-neutral-900/60 to-neutral-900/40 backdrop-blur-sm
                                 flex items-center justify-center text-3xl border border-neutral-800/50 group-hover:scale-110 transition-transform duration-300"
                              >
                                {achievement.icon}
                              </div>
                              {isUnlocked && (
                                <div className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Unlocked
                                </div>
                              )}
                            </div>

                            {/* Achievement Details */}
                            <h3
                              className={`font-bold text-lg mb-1 ${isUnlocked ? "text-white" : "text-neutral-500"}`}
                            >
                              {achievement.title}
                            </h3>
                            <p
                              className={`text-sm mb-3 line-clamp-2 ${isUnlocked ? "text-neutral-300" : "text-neutral-600"}`}
                            >
                              {achievement.description}
                            </p>

                            {/* Progress Bar */}
                            <div className="mt-auto">
                              <div className="flex justify-between text-xs mb-1">
                                <span
                                  className={`${isUnlocked ? colors.text : "text-neutral-600"}`}
                                >
                                  {rarityLevel.charAt(0).toUpperCase() +
                                    rarityLevel.slice(1)}
                                </span>
                                <span
                                  className={`${isUnlocked ? "text-white" : "text-neutral-600"}`}
                                >
                                  {achievement.progress}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-neutral-800/70 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${achievement.progress}%`,
                                  }}
                                  transition={{ duration: 1 }}
                                  className={`h-full ${colors.progress}`}
                                />
                              </div>

                              {isUnlocked && (
                                <div className="mt-2 flex justify-between items-center">
                                  <div className="text-xs text-neutral-500">
                                    {new Date(
                                      achievement.unlockedAt,
                                    ).toLocaleDateString()}
                                  </div>
                                  <div className="text-xs text-amber-400">
                                    +{achievement.xpReward} XP
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredAchievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-neutral-900/30 rounded-xl border border-neutral-800/50"
        >
          <div className="w-20 h-20 mx-auto bg-neutral-800/50 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            No achievements found
          </h3>
          <p className="text-neutral-400 max-w-md mx-auto mb-6">
            {searchQuery
              ? `No achievements matching "${searchQuery}" found. Try a different search term.`
              : `You don't have any ${filter !== "all" ? filter : ""} achievements yet. Complete goals to earn achievements!`}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setFilter("all");
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500
              rounded-xl text-white font-medium hover:opacity-90 transition-all duration-300
              mx-auto flex items-center gap-2"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset Filters
          </button>
        </motion.div>
      )}

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
              <div className="w-full max-w-md rounded-2xl overflow-hidden">
                {/* Using the achievement's rarity for styling */}
                {(() => {
                  const isUnlocked = selectedAchievement.unlockedAt !== null;
                  const rarityLevel = selectedAchievement.rarity || "common";
                  const colors = rarityColors[rarityLevel];

                  return (
                    <div
                      className={`bg-gradient-to-br ${colors.bg} ${colors.border} overflow-hidden`}
                    >
                      {/* Achievement Header with Icon */}
                      <div className="p-6 text-center">
                        <div
                          className={`h-24 w-24 mx-auto mb-4 rounded-xl bg-gradient-to-br from-neutral-900/60 to-neutral-900/40
                          flex items-center justify-center text-5xl border border-neutral-800/50
                          ${isUnlocked ? "" : "grayscale opacity-70"}`}
                        >
                          {selectedAchievement.icon}
                        </div>
                        <h2
                          className={`text-2xl font-bold mb-1 ${isUnlocked ? "text-white" : "text-neutral-500"}`}
                        >
                          {selectedAchievement.title}
                        </h2>
                        <p
                          className={`text-sm ${isUnlocked ? "text-neutral-300" : "text-neutral-600"}`}
                        >
                          {selectedAchievement.description}
                        </p>
                      </div>

                      {/* Achievement Details */}
                      <div className="bg-neutral-900/80 backdrop-blur-md p-6 space-y-4">
                        {/* Status */}
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400 text-sm">
                            Status
                          </span>
                          {isUnlocked ? (
                            <span className="bg-green-500/20 text-green-400 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Unlocked
                            </span>
                          ) : (
                            <span className="bg-neutral-800/70 text-neutral-400 text-xs px-2.5 py-1 rounded-full">
                              In Progress
                            </span>
                          )}
                        </div>

                        {/* Progress */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-400">Progress</span>
                            <span className="text-white">
                              {selectedAchievement.progress}%
                            </span>
                          </div>
                          <div className="h-2 bg-neutral-800/70 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${selectedAchievement.progress}%`,
                              }}
                              transition={{ duration: 1 }}
                              className={`h-full ${colors.progress}`}
                            />
                          </div>
                        </div>

                        {/* Rarity */}
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400 text-sm">
                            Rarity
                          </span>
                          <span
                            className={`${colors.text} text-sm font-medium`}
                          >
                            {rarityLevel.charAt(0).toUpperCase() +
                              rarityLevel.slice(1)}
                          </span>
                        </div>

                        {/* Reward */}
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400 text-sm">
                            XP Reward
                          </span>
                          <span className="text-amber-400 text-sm font-medium">
                            +{selectedAchievement.xpReward} XP
                          </span>
                        </div>

                        {/* Unlocked Date */}
                        {isUnlocked && (
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-400 text-sm">
                              Unlocked On
                            </span>
                            <span className="text-white text-sm">
                              {new Date(
                                selectedAchievement.unlockedAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        )}

                        {/* Close Button */}
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedAchievement(null)}
                          className="w-full mt-2 px-4 py-3 rounded-lg bg-neutral-800/70 hover:bg-neutral-700/70
                                                    text-white transition-all"
                        >
                          Close
                        </motion.button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Achievements;
