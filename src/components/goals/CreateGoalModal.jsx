import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CreateGoalModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    gameName: "",
    goalName: "",
    deadline: "",
    isGroupGoal: false,
    groupId: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);

  useEffect(() => {
    if (formData.isGroupGoal) {
      fetchUserGroups();
    }
  }, [formData.isGroupGoal]);

  const fetchUserGroups = async () => {
    setIsLoadingGroups(true);
    try {
      const response = await fetch(
        "http://localhost:3001/api/groups/user-groups",
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const data = await response.json();
      setUserGroups(data.data || []);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setError("Failed to load groups");
    } finally {
      setIsLoadingGroups(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Create the request body based on whether it's a group goal or not
      const requestBody = {
        gameName: formData.gameName,
        goalName: formData.goalName,
        deadline: formData.deadline,
        isGroupGoal: formData.isGroupGoal,
      };

      // Only add groupId if it's a group goal and a group is selected
      if (formData.isGroupGoal && formData.groupId) {
        requestBody.groupId = formData.groupId;
      }

      console.log("Sending request with body:", requestBody); // Debug log

      const response = await fetch("http://localhost:3001/api/goals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData); // Debug log

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create goal");
      }

      onSuccess(responseData.data);
      onClose();
    } catch (err) {
      console.error("Error creating goal:", err);
      setError(err.message || "Failed to create goal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#111111] rounded-xl w-full max-w-md border border-neutral-800 shadow-xl">
              <div className="p-6 border-b border-neutral-800">
                <h2 className="text-xl font-bold text-white">
                  Create New Goal
                </h2>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-6 mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-red-500 text-sm text-center">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label
                    htmlFor="gameName"
                    className="block text-sm font-medium text-neutral-400 mb-2"
                  >
                    Game Name
                  </label>
                  <input
                    type="text"
                    id="gameName"
                    value={formData.gameName}
                    onChange={(e) =>
                      setFormData({ ...formData, gameName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
                      text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
                      transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="goalName"
                    className="block text-sm font-medium text-neutral-400 mb-2"
                  >
                    Goal Name
                  </label>
                  <input
                    type="text"
                    id="goalName"
                    value={formData.goalName}
                    onChange={(e) =>
                      setFormData({ ...formData, goalName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
                      text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
                      transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-neutral-400 mb-2"
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
                      text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
                      transition-all duration-300"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isGroupGoal"
                    checked={formData.isGroupGoal}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        isGroupGoal: e.target.checked,
                        groupId: null, // Reset to null when toggling
                      });
                    }}
                    className="w-4 h-4 rounded text-[#00F0FF] focus:ring-[#00F0FF] bg-neutral-900 border-neutral-800"
                  />
                  <label
                    htmlFor="isGroupGoal"
                    className="ml-2 text-sm font-medium text-neutral-400"
                  >
                    This is a group goal
                  </label>
                </div>

                <AnimatePresence>
                  {formData.isGroupGoal && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label
                        htmlFor="groupId"
                        className="block text-sm font-medium text-neutral-400 mb-2"
                      >
                        Select Group
                      </label>
                      {isLoadingGroups ? (
                        <div className="flex items-center justify-center py-2">
                          <div className="animate-spin h-5 w-5 border-2 border-[#00F0FF] rounded-full border-t-transparent" />
                        </div>
                      ) : (
                        <select
                          id="groupId"
                          value={formData.groupId || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              groupId: e.target.value || null,
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
                            text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
                            transition-all duration-300"
                          required={formData.isGroupGoal}
                        >
                          <option value="">Select a group</option>
                          {userGroups.map((group) => (
                            <option key={group._id} value={group._id}>
                              {group.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <div className="p-6 border-t border-neutral-800 flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-white font-medium
                    hover:bg-neutral-800 transition-all duration-300"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={
                    isLoading || (formData.isGroupGoal && !formData.groupId)
                  }
                  className="px-6 py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                    rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                      Creating...
                    </>
                  ) : (
                    "Create Goal"
                  )}
                </motion.button>
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
  onSuccess: PropTypes.func.isRequired,
};

export default CreateGoalModal;
