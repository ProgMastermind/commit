import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IndividualAchievements from "../components/achievements/IndividualAchievements";
import GroupAchievements from "../components/achievements/GroupAchievements";

const Achievements = () => {
  const [achievements, setAchievements] = useState({
    individual: [],
    group: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("individual");
  const [sortBy, setSortBy] = useState("recent"); // recent, oldest, game

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/goals/user-goals",
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }

      const data = await response.json();

      // Filter and separate achievements
      const allGoals = data.data.all || [];
      const individual = allGoals.filter(
        (goal) => !goal.isGroupGoal && goal.status === "completed",
      );
      const group = allGoals.filter(
        (goal) => goal.isGroupGoal && goal.status === "completed",
      );

      setAchievements({ individual, group });
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
            Achievements
          </h1>
          <p className="text-neutral-400 mt-1">
            Track your gaming milestones and victories
          </p>
        </motion.div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800
            text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
            transition-all duration-300"
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest First</option>
          <option value="game">By Game</option>
        </select>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800">
        <button
          onClick={() => setActiveTab("individual")}
          className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300
            ${
              activeTab === "individual"
                ? "text-white border-b-2 border-[#00F0FF]"
                : "text-neutral-400 hover:text-white"
            }`}
        >
          Individual Achievements
        </button>
        <button
          onClick={() => setActiveTab("group")}
          className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300
            ${
              activeTab === "group"
                ? "text-white border-b-2 border-[#00F0FF]"
                : "text-neutral-400 hover:text-white"
            }`}
        >
          Group Achievements
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00F0FF]" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      )}

      {/* Achievement Content */}
      {!isLoading && !error && (
        <div className="space-y-8">
          {activeTab === "individual" ? (
            <IndividualAchievements
              achievements={achievements.individual}
              sortBy={sortBy}
            />
          ) : (
            <GroupAchievements
              achievements={achievements.group}
              sortBy={sortBy}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Achievements;
