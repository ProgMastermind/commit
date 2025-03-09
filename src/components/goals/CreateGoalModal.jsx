import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CreateGoalModal = ({ isOpen, onClose, onSuccess }) => {
  const [goalName, setGoalName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("fitness");
  const [difficulty, setDifficulty] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [isGroupGoal, setIsGroupGoal] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user groups on component mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/groups/user-groups",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }

        const data = await response.json();
        // Only show groups where the user is a member
        setGroups(
          data.data.filter((group) => group.isMember) || []
        );
      } catch (err) {
        console.error("Error fetching groups:", err);
      }
    };

    if (isOpen) {
      fetchGroups();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!goalName || !deadline) {
      setError("Goal name and deadline are required");
      return;
    }

    if (isGroupGoal && !groupId) {
      setError("Please select a group for this group goal");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const goalData = {
        goalName,
        description,
        category,
        difficulty,
        deadline,
        isGroupGoal,
      };

      if (isGroupGoal && groupId) {
        goalData.groupId = groupId;
      }

      const response = await fetch("http://localhost:3001/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create goal");
      }

      const data = await response.json();
      console.log("Goal created successfully:", data);
      if (onSuccess) onSuccess(data.data);
      
      // Reset form fields
      setGoalName("");
      setDescription("");
      setCategory("fitness");
      setDifficulty("medium");
      setDeadline("");
      setIsGroupGoal(false);
      setGroupId("");
      
      onClose();
    } catch (err) {
      console.error("Error creating goal:", err);
      setError(err.message || "Failed to create goal");
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { value: "fitness", label: "Fitness" },
    { value: "reading", label: "Reading" },
    { value: "learning", label: "Learning" },
    { value: "meditation", label: "Meditation" },
    { value: "nutrition", label: "Nutrition" },
    { value: "productivity", label: "Productivity" },
    { value: "creativity", label: "Creativity" },
    { value: "social", label: "Social" },
    { value: "finance", label: "Finance" },
    { value: "career", label: "Career" },
    { value: "other", label: "Other" },
  ];

  const difficultyOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

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
            <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-neutral-800/80 to-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="relative p-6 border-b border-neutral-700/50">
                {/* Decorative element */}
                <div className="absolute -top-24 right-0 w-40 h-40 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF006F]/20 rounded-full blur-3xl opacity-50" />

                <div className="relative flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Create New Goal
                  </h2>
                  <button
                    onClick={onClose}
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

              {/* Form Content - Scrollable */}
              <div className="p-6 overflow-y-auto flex-1">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Goal Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Goal Details</h3>
                    
                    {/* Goal Name */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Goal Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        placeholder="e.g., Run 5km"
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50"
                        required
                      />
                    </div>
                    
                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Description (Optional)
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your goal in more detail..."
                        rows={3}
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 resize-none"
                      />
                    </div>
                    
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "3rem",
                        }}
                      >
                        {categoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Difficulty */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Difficulty
                      </label>
                      <div className="flex gap-3">
                        {difficultyOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setDifficulty(option.value)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              difficulty === option.value
                                ? option.value === "easy"
                                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                  : option.value === "medium"
                                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                  : "bg-red-500/20 text-red-300 border border-red-500/30"
                                : "bg-neutral-800/50 text-neutral-400 border border-neutral-700/50 hover:bg-neutral-700/50"
                            }`}
                          >
                            {option.value === "easy"
                              ? "⭐ Easy"
                              : option.value === "medium"
                              ? "⭐⭐ Medium"
                              : "⭐⭐⭐ Hard"}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Deadline */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Deadline <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50"
                        required
                      />
                    </div>
                    
                    {/* Group Goal Toggle */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-neutral-300">
                          Make this a group goal
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setIsGroupGoal(!isGroupGoal);
                            if (!isGroupGoal && groups.length > 0) {
                              setGroupId(groups[0]._id);
                            } else {
                              setGroupId("");
                            }
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 ${
                            isGroupGoal ? "bg-[#00F0FF]" : "bg-neutral-700"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isGroupGoal ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      
                      {/* Group selection - only show if isGroupGoal is true */}
                      {isGroupGoal && (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-neutral-300 mb-1">
                            Select Group <span className="text-red-500">*</span>
                          </label>
                          {groups.length === 0 ? (
                            <div className="text-sm text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                              You need to join or create a group first to create a group goal.
                            </div>
                          ) : (
                            <select
                              value={groupId}
                              onChange={(e) => setGroupId(e.target.value)}
                              className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 appearance-none"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 1rem center",
                                backgroundSize: "1.5em 1.5em",
                                paddingRight: "3rem",
                              }}
                              required={isGroupGoal}
                            >
                              <option value="" disabled>
                                Select a group
                              </option>
                              {groups.map((group) => (
                                <option key={group._id} value={group._id}>
                                  {group.name}
                                </option>
                              ))}
                            </select>
                          )}
                          <p className="mt-2 text-xs text-blue-300">
                            <svg
                              className="w-4 h-4 inline-block mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Group goals will be visible to all members of the selected group. Each member will need to complete the goal individually.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Error message */}
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading || (isGroupGoal && groups.length === 0)}
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                        isLoading || (isGroupGoal && groups.length === 0)
                          ? "bg-neutral-700/50 text-neutral-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-white hover:shadow-lg hover:shadow-[#FF006F]/20"
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
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
                          Creating...
                        </span>
                      ) : (
                        "Create Goal"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

CreateGoalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default CreateGoalModal;
