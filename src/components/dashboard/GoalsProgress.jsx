import { motion } from "framer-motion";
import { useState } from "react";
import CreateGoalModal from "../goals/CreateGoalModal";

// Mock data for pending goals
const pendingGoals = [
  {
    id: 1,
    gameName: "PUBG",
    goalName: "Win 10 Battle Royale Matches",
    deadline: "2024-02-20",
  },
  {
    id: 2,
    gameName: "League of Legends",
    goalName: "Reach Diamond Rank",
    deadline: "2024-02-23",
  },
  {
    id: 3,
    gameName: "Free Fire",
    goalName: "Complete Battle Pass",
    deadline: "2024-02-19",
  },
];

const GoalsProgress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111111] rounded-xl border border-neutral-800 h-full"
    >
      {/* Header */}
      <div className="p-6 border-b border-neutral-800">
        <h2 className="text-xl font-bold text-white">Pending Goals</h2>
      </div>

      {/* Goals List */}
      <div className="p-6 space-y-4">
        {pendingGoals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group bg-neutral-900/50 rounded-lg p-4 border border-neutral-800
              hover:border-[#00F0FF] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3
                  className="font-semibold text-white group-hover:text-[#00F0FF]
                  transition-colors duration-300"
                >
                  {goal.goalName}
                </h3>
                <p className="text-sm text-neutral-400">{goal.gameName}</p>
              </div>
              <span
                className={`text-sm px-2 py-0.5 rounded-full font-medium
                ${
                  getDaysLeft(goal.deadline) <= 2
                    ? "bg-red-500/10 text-red-500"
                    : getDaysLeft(goal.deadline) <= 5
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-green-500/10 text-green-500"
                }`}
              >
                {getDaysLeft(goal.deadline)} days left
              </span>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="text-sm px-3 py-1 rounded-full bg-neutral-800
                  text-neutral-400 hover:bg-neutral-700 transition-all duration-300"
                onClick={() => console.log("Mark as complete")}
              >
                Complete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Add Button */}
      <div className="p-6 border-t border-neutral-800">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
            rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300
            shadow-lg hover:shadow-[#00F0FF]/20 flex items-center justify-center gap-2"
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
