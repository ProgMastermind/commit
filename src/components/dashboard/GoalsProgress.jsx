import { motion } from "framer-motion";
import { useState } from "react";
import CreateGoalModal from "../goals/CreateGoalModal";

// Mock data for pending goals
const pendingGoals = [
  {
    id: 1,
    category: "Fitness",
    goalName: "Run 20 miles this week",
    deadline: "2024-02-20",
    progress: 70,
  },
  {
    id: 2,
    category: "Reading",
    goalName: "Finish 2 books this month",
    deadline: "2024-02-23",
    progress: 45,
  },
  {
    id: 3,
    category: "Learning",
    goalName: "Complete JavaScript course",
    deadline: "2024-02-19",
    progress: 85,
  },
];

const GoalsProgress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completingGoalId, setCompletingGoalId] = useState(null);

  const getDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleMarkAsComplete = (goalId) => {
    setCompletingGoalId(goalId);
    // Simulate API call
    setTimeout(() => {
      setCompletingGoalId(null);
      // Here you would update your state or refetch goals
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-neutral-800/50">
        <h2 className="text-xl font-bold text-white">Active Goals</h2>
        <div className="bg-neutral-800/70 rounded-lg flex overflow-hidden">
          <button className="px-3 py-1.5 text-xs font-medium bg-[#00F0FF]/20 text-[#00F0FF]">
            Active
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors">
            Completed
          </button>
        </div>
      </div>

      {/* Goals List */}
      <div className="p-6 space-y-4">
        {pendingGoals.map((goal) => {
          const daysLeft = getDaysLeft(goal.deadline);
          const isCompleting = completingGoalId === goal.id;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group bg-neutral-800/30 rounded-xl p-4 border border-neutral-700/30
                hover:border-[#00F0FF]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3
                    className="font-semibold text-white group-hover:text-[#00F0FF]
                    transition-colors duration-300"
                  >
                    {goal.goalName}
                  </h3>
                  <p className="text-sm text-neutral-400">{goal.category}</p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium
                  ${
                    daysLeft <= 2
                      ? "bg-red-500/20 text-red-400"
                      : daysLeft <= 5
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {daysLeft} days left
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">Progress</span>
                  <span className="text-white">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-neutral-800/70 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1 }}
                    style={{
                      background: `linear-gradient(to right, #00F0FF, ${
                        goal.progress > 60 ? "#FF006F" : "#00F0FF"
                      })`,
                    }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                    text-white hover:shadow-lg hover:shadow-[#00F0FF]/20 transition-all duration-300
                    flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleMarkAsComplete(goal.id)}
                  disabled={isCompleting}
                >
                  {isCompleting ? (
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
                      Processing...
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
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Add Button */}
      <div className="p-6 border-t border-neutral-800/50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2.5 bg-neutral-800/70 hover:bg-neutral-800 rounded-xl text-neutral-300
            font-medium transition-all duration-300 flex items-center justify-center gap-2"
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
          Add New Goal
        </motion.button>
      </div>

      {/* Create Goal Modal */}
      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default GoalsProgress;
