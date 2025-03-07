import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CreateGoalModal from "../components/goals/CreateGoalModal";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [filter, setFilter] = useState("all");
  const [isCompletingGoal, setIsCompletingGoal] = useState(null);
  const [sortBy, setSortBy] = useState("deadline");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:3001/api/goals/user-goals",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Failed to fetch goals");
      }

      const data = await response.json();
      setGoals(data.data.all || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsComplete = async (goalId) => {
    try {
      setIsCompletingGoal(goalId);

      const response = await fetch(
        `http://localhost:3001/api/goals/${goalId}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to complete goal");
      }

      // Update local state
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal._id === goalId ? { ...goal, status: "completed" } : goal,
        ),
      );
    } catch (err) {
      console.error("Error completing goal:", err);
      setError("Failed to mark goal as complete");
    } finally {
      setIsCompletingGoal(null);
    }
  };

  const getDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getSortedAndFilteredGoals = () => {
    // First filter by type, status, and search query
    const filtered = goals.filter((goal) => {
      const matchesType =
        activeTab === "personal" ? !goal.isGroupGoal : goal.isGroupGoal;
      const matchesStatus =
        filter === "all" || goal.status.toLowerCase() === filter;
      const matchesSearch =
        !searchQuery ||
        goal.goalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (goal.category &&
          goal.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesType && matchesStatus && matchesSearch;
    });

    // Then sort
    return [...filtered].sort((a, b) => {
      if (sortBy === "deadline") {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (sortBy === "name") {
        return a.goalName.localeCompare(b.goalName);
      }
      if (sortBy === "category") {
        return (a.category || "").localeCompare(b.category || "");
      }
      if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
  };

  const sortedAndFilteredGoals = getSortedAndFilteredGoals();

  const handleGoalCreated = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setIsCreateModalOpen(false);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      fitness: "💪",
      reading: "📚",
      learning: "🧠",
      meditation: "🧘",
      nutrition: "🥗",
      productivity: "⏱️",
      creativity: "🎨",
      social: "👋",
      finance: "💰",
      career: "💼",
    };
    return icons[category] || "🎯";
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
                Your Goals
              </h1>
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-0 h-0.5 w-20 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full"></div>
            </div>

            <p className="text-neutral-400 mt-4">
              Track your progress and stay accountable
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(0, 240, 255, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
              rounded-xl text-white font-medium shadow-lg hover:shadow-xl
              transition-all duration-300 flex items-center gap-2"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Goal
          </motion.button>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-neutral-300 font-medium">Total Goals</h3>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">{goals.length}</p>
              <p className="text-sm text-green-400 mb-1">+3 this week</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-neutral-300 font-medium">Completed Goals</h3>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">
                {goals.filter((g) => g.status === "completed").length}
              </p>
              <p className="text-sm text-green-400 mb-1">
                {Math.round(
                  (goals.filter((g) => g.status === "completed").length /
                    Math.max(goals.length, 1)) *
                    100,
                )}
                % completion
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-neutral-300 font-medium">Active Goals</h3>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">
                {goals.filter((g) => g.status === "active").length}
              </p>
              <p className="text-sm text-yellow-400 mb-1">
                {
                  goals.filter((g) => {
                    const daysLeft = Math.ceil(
                      (new Date(g.deadline) - new Date()) /
                        (1000 * 60 * 60 * 24),
                    );
                    return g.status === "active" && daysLeft <= 3;
                  }).length
                }{" "}
                due soon
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        {/* Search Bar */}
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
            placeholder="Search goals by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50
              text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
              transition-all duration-300"
          />
        </div>

        {/* Tabs for Goal Type */}
        <div className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-1 flex">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex-1 px-4 py-2.5 text-center font-medium rounded-lg transition-colors
              ${
                activeTab === "personal"
                  ? "bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Personal
            </span>
          </button>
          <button
            onClick={() => setActiveTab("group")}
            className={`flex-1 px-4 py-2.5 text-center font-medium rounded-lg transition-colors
              ${
                activeTab === "group"
                  ? "bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Group
            </span>
          </button>
        </div>

        {/* Status Filter */}
        <div className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-1 flex">
          {["all", "active", "completed"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors
                ${
                  filter === filterType
                    ? "bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
            >
              {filterType}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50
            text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
            transition-all duration-300"
        >
          <option value="deadline">Sort by Deadline</option>
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="relative w-20 h-20">
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-neutral-800"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-[#00F0FF] animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00F0FF]">
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
                Error Loading Goals
              </h3>
              <p className="text-neutral-400">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchGoals}
            className="mt-4 ml-auto block px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Goals Grid */}
      {!isLoading && !error && (
        <>
          {sortedAndFilteredGoals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAndFilteredGoals.map((goal) => {
                const daysLeft = getDaysLeft(goal.deadline);
                const isCompleting = isCompletingGoal === goal._id;

                return (
                  <motion.div
                    key={goal._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-800/50
                      hover:border-[#00F0FF]/50 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-1 w-10 h-10 rounded-xl bg-gradient-to-r from-[#00F0FF]/10 to-[#FF006F]/10
                          border border-[#00F0FF]/20 flex items-center justify-center text-xl group-hover:scale-110
                          transition-transform duration-300"
                        >
                          {getCategoryIcon(goal.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-[#00F0FF] transition-colors duration-300">
                            {goal.goalName}
                          </h3>
                          <p className="text-sm text-neutral-400 capitalize">
                            {goal.category || "General"}
                            {goal.isGroupGoal && " • Group Goal"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium
                          ${
                            goal.status === "completed"
                              ? "bg-green-500/10 text-green-400"
                              : daysLeft <= 2
                                ? "bg-red-500/20 text-red-400"
                                : daysLeft <= 5
                                  ? "bg-amber-500/20 text-amber-400"
                                  : "bg-blue-500/20 text-blue-400"
                          }`}
                      >
                        {goal.status === "completed"
                          ? "Completed"
                          : `${daysLeft} days left`}
                      </span>
                    </div>

                    {/* Target Display */}
                    {goal.targetValue && goal.targetUnit && (
                      <div className="mt-3 mb-4 bg-neutral-800/30 rounded-lg p-3 flex justify-between items-center">
                        <span className="text-sm text-neutral-400">
                          Target:
                        </span>
                        <span className="text-white font-medium">
                          {goal.targetValue} {goal.targetUnit} {goal.frequency}
                        </span>
                      </div>
                    )}

                    {/* Progress bar for active goals */}
                    {goal.status !== "completed" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-neutral-400">Progress</span>
                          <span className="text-white">
                            {goal.progress || 0}%
                          </span>
                        </div>
                        <div className="h-2 bg-neutral-800/70 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.progress || 0}%` }}
                            transition={{ duration: 1 }}
                            style={{
                              background: `linear-gradient(to right, #00F0FF, ${
                                (goal.progress || 0) > 60
                                  ? "#FF006F"
                                  : "#00F0FF"
                              })`,
                            }}
                            className="h-full rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-neutral-500">
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {goal.status !== "completed" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                              text-white hover:shadow-lg hover:shadow-[#00F0FF]/20 transition-all duration-300
                              flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleMarkAsComplete(goal._id)}
                            disabled={isCompleting === goal._id}
                          >
                            {isCompleting === goal._id ? (
                              <>
                                <svg
                                  className="animate-spin h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-4 h-4"
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
                                Complete
                              </>
                            )}
                          </motion.button>
                        )}

                        <button
                          className="text-sm p-1.5 rounded-lg bg-neutral-800/70 hover:bg-neutral-700/70
                          text-neutral-400 hover:text-white transition-all duration-300"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                No goals found
              </h3>
              <p className="text-neutral-400 max-w-md mx-auto mb-6">
                {searchQuery
                  ? `No goals matching "${searchQuery}" found. Try a different search term or clear the filter.`
                  : `You don't have any ${filter !== "all" ? filter : ""} ${activeTab} goals yet. Create your first goal to get started on your journey!`}
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create New Goal
              </button>
            </motion.div>
          )}
        </>
      )}

      {/* Create Goal Modal */}
      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleGoalCreated}
      />
    </div>
  );
};

export default Goals;
