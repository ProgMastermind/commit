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

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
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

  const filteredGoals = goals.filter((goal) => {
    const matchesType =
      activeTab === "personal" ? !goal.isGroupGoal : goal.isGroupGoal;
    const matchesStatus =
      filter === "all" || goal.status.toLowerCase() === filter;
    return matchesType && matchesStatus;
  });

  const handleGoalCreated = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
            Your Goals
          </h1>
          <p className="text-neutral-400 mt-1">
            Track and manage your gaming achievements
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
            rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300"
        >
          Create New Goal
        </motion.button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800">
        <button
          onClick={() => setActiveTab("personal")}
          className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300
            ${
              activeTab === "personal"
                ? "text-white border-b-2 border-[#00F0FF]"
                : "text-neutral-400 hover:text-white"
            }`}
        >
          Personal Goals
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
          Group Goals
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "active", "completed"].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize
              ${
                filter === filterType
                  ? "bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-white"
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
              } transition-all duration-300`}
          >
            {filterType}
          </button>
        ))}
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

      {/* Goals Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => (
            <motion.div
              key={goal._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] rounded-xl p-6 border border-neutral-800
                hover:border-[#00F0FF] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-white">{goal.goalName}</h3>
                  <p className="text-sm text-neutral-400">{goal.gameName}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium
                    ${
                      goal.status === "completed"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                >
                  {goal.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Deadline</span>
                  <span className="text-white">
                    {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
                {goal.isGroupGoal && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Group</span>
                    <span className="text-[#00F0FF]">
                      {goal.groupName || "Group"}
                    </span>
                  </div>
                )}
              </div>

              {goal.status === "active" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMarkAsComplete(goal._id)}
                  disabled={isCompletingGoal === goal._id}
                  className="w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium
                    bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-white
                    hover:opacity-90 transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center"
                >
                  {isCompletingGoal === goal._id ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Completing...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Mark as Complete
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
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
