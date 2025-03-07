import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";

const goalCategories = [
  { id: "fitness", name: "Fitness" },
  { id: "reading", name: "Reading" },
  { id: "learning", name: "Learning" },
  { id: "meditation", name: "Meditation" },
  { id: "nutrition", name: "Nutrition" },
  { id: "productivity", name: "Productivity" },
  { id: "creativity", name: "Creativity" },
  { id: "social", name: "Social" },
  { id: "finance", name: "Finance" },
  { id: "career", name: "Career" },
  { id: "other", name: "Other" },
];

const CreateGoalModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    goalName: "",
    category: "",
    deadline: "",
    isGroupGoal: false,
    groupId: "",
    frequency: "daily", // daily, weekly, monthly
    targetValue: "",
    targetUnit: "",
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock data for groups selection
  const groups = [
    { id: "group1", name: "Fitness Enthusiasts" },
    { id: "group2", name: "Book Club" },
    { id: "group3", name: "Productivity Masters" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Add validation
      if (
        !formData.goalName.trim() ||
        !formData.category ||
        !formData.deadline
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (formData.isGroupGoal && !formData.groupId) {
        throw new Error("Please select a group for your group goal");
      }

      const response = await fetch("http://localhost:3001/api/goals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create goal");
      }

      if (onSuccess) onSuccess(data.data);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    setFormData({
      goalName: "",
      category: "",
      deadline: "",
      isGroupGoal: false,
      groupId: "",
      frequency: "daily",
      targetValue: "",
      targetUnit: "",
    });
    setStep(1);
    setError("");
    onClose();
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.goalName.trim() || !formData.category) {
        setError("Please fill in both goal name and category");
        return;
      }
    }
    setStep(step + 1);
    setError("");
  };

  const prevStep = () => {
    setStep(step - 1);
    setError("");
  };

  // Get unit options based on selected category
  const getUnitOptions = () => {
    switch (formData.category) {
      case "fitness":
        return ["minutes", "workouts", "miles", "steps", "reps"];
      case "reading":
        return ["pages", "books", "chapters", "articles"];
      case "learning":
        return ["hours", "courses", "lessons", "projects"];
      case "meditation":
        return ["minutes", "sessions"];
      case "nutrition":
        return ["meals", "calories", "glasses of water"];
      default:
        return ["times", "hours", "sessions", "tasks"];
    }
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
            onClick={resetAndClose}
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
                <div className="absolute -top-24 right-0 w-40 h-40 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF006F]/20 rounded-full blur-3xl opacity-50" />

                <div className="relative flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Create New Goal
                  </h2>
                  <button
                    onClick={resetAndClose}
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

                {/* Progress steps */}
                <div className="mt-6 flex justify-between">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 relative">
                      <div
                        className={`w-full h-1 ${i <= step ? "bg-gradient-to-r from-[#00F0FF] to-[#FF006F]" : "bg-neutral-700"}`}
                      />
                      <div
                        className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                          i < step
                            ? "bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-white"
                            : i === step
                              ? "bg-gradient-to-r from-[#00F0FF]/30 to-[#FF006F]/30 border border-[#00F0FF] text-white"
                              : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                        }`}
                      >
                        {i < step ? (
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
                        ) : (
                          i
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mx-6 mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Steps */}
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-5"
                      >
                        <h3 className="text-lg font-medium text-white mb-4">
                          Goal Details
                        </h3>

                        <div>
                          <label
                            htmlFor="goalName"
                            className="block text-sm font-medium text-neutral-300 mb-2"
                          >
                            Goal Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="goalName"
                            name="goalName"
                            value={formData.goalName}
                            onChange={handleChange}
                            placeholder="E.g. Run 3 times a week"
                            className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                                       text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                                       transition-all duration-300"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-neutral-300 mb-2"
                          >
                            Category <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                                       text-white focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                                       transition-all duration-300"
                            required
                          >
                            <option value="">Select a category</option>
                            {goalCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-5"
                      >
                        <h3 className="text-lg font-medium text-white mb-4">
                          Goal Specifics
                        </h3>

                        <div>
                          <label
                            htmlFor="frequency"
                            className="block text-sm font-medium text-neutral-300 mb-2"
                          >
                            Frequency
                          </label>
                          <select
                            id="frequency"
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                                       text-white focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                                       transition-all duration-300"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="targetValue"
                              className="block text-sm font-medium text-neutral-300 mb-2"
                            >
                              Target
                            </label>
                            <input
                              type="number"
                              id="targetValue"
                              name="targetValue"
                              value={formData.targetValue}
                              onChange={handleChange}
                              placeholder="E.g. 3"
                              min="1"
                              className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                                         text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                                         transition-all duration-300"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="targetUnit"
                              className="block text-sm font-medium text-neutral-300 mb-2"
                            >
                              Unit
                            </label>
                            <select
                              id="targetUnit"
                              name="targetUnit"
                              value={formData.targetUnit}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                                         text-white focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                                         transition-all duration-300"
                            >
                              <option value="">Select unit</option>
                              {getUnitOptions().map((unit) => (
                                <option key={unit} value={unit}>
                                  {unit}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="deadline"
                            className="block text-sm font-medium text-neutral-300 mb-2"
                          >
                            Deadline <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                                       text-white focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                                       transition-all duration-300"
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-5"
                      >
                        <h3 className="text-lg font-medium text-white mb-4">
                          Accountability Settings
                        </h3>

                        <div>
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id="isGroupGoal"
                              name="isGroupGoal"
                              checked={formData.isGroupGoal}
                              onChange={handleChange}
                              className="h-4 w-4 border-neutral-700 rounded bg-neutral-800
                                         focus:ring-[#00F0FF] text-[#00F0FF]"
                            />
                            <label
                              htmlFor="isGroupGoal"
                              className="ml-2 block text-sm font-medium text-neutral-300"
                            >
                              Make this a group goal
                            </label>
                          </div>

                          <p className="text-xs text-neutral-400 mb-3">
                            Group goals are shared with others for better
                            accountability and support.
                          </p>
                        </div>

                        {formData.isGroupGoal && (
                          <div>
                            <label
                              htmlFor="groupId"
                              className="block text-sm font-medium text-neutral-300 mb-2"
                            >
                              Select Group{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="groupId"
                              name="groupId"
                              value={formData.groupId}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                                         text-white focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                                         transition-all duration-300"
                              required={formData.isGroupGoal}
                            >
                              <option value="">Select a group</option>
                              {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                  {group.name}
                                </option>
                              ))}
                            </select>
                            <p className="mt-2 text-xs text-neutral-400">
                              Dont have a group?{" "}
                              <a
                                href="#"
                                className="text-[#00F0FF] hover:text-[#FF006F] transition-colors"
                              >
                                Create one
                              </a>
                            </p>
                          </div>
                        )}

                        {/* Goal Summary */}
                        <div className="rounded-xl bg-neutral-800/30 border border-neutral-700/30 p-4 mt-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Goal:</span>
                            <span className="text-white font-medium">
                              {formData.goalName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Category:</span>
                            <span className="text-white font-medium">
                              {goalCategories.find(
                                (c) => c.id === formData.category,
                              )?.name || "Not set"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Target:</span>
                            <span className="text-white font-medium">
                              {formData.targetValue && formData.targetUnit
                                ? `${formData.targetValue} ${formData.targetUnit} ${formData.frequency}`
                                : "Not specified"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Deadline:</span>
                            <span className="text-white font-medium">
                              {formData.deadline
                                ? new Date(
                                    formData.deadline,
                                  ).toLocaleDateString()
                                : "Not set"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Type:</span>
                            <span className="text-white font-medium">
                              {formData.isGroupGoal
                                ? "Group Goal"
                                : "Individual Goal"}
                            </span>
                          </div>
                          {formData.isGroupGoal && formData.groupId && (
                            <div className="flex justify-between">
                              <span className="text-neutral-400">Group:</span>
                              <span className="text-[#00F0FF] font-medium">
                                {groups.find((g) => g.id === formData.groupId)
                                  ?.name || "Unknown"}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Footer with Buttons */}
              <div className="p-6 border-t border-neutral-700/50 flex justify-between">
                {step > 1 ? (
                  <button
                    onClick={prevStep}
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700
                               text-white transition-colors flex items-center gap-2"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back
                  </button>
                ) : (
                  <button
                    onClick={resetAndClose}
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700
                               text-white transition-colors"
                  >
                    Cancel
                  </button>
                )}

                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                               text-white font-medium hover:shadow-lg hover:shadow-[#00F0FF]/20 transition-all
                               flex items-center gap-2"
                  >
                    Next
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                               text-white font-medium hover:shadow-lg hover:shadow-[#00F0FF]/20 transition-all
                               disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
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
                      </>
                    ) : (
                      <>
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Create Goal
                      </>
                    )}
                  </motion.button>
                )}
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
