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

const CreateGroupModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    maxMembers: 10,
    privacy: "public",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdGroup, setCreatedGroup] = useState(null);
  const [step, setStep] = useState(1); // 1: Form, 2: Success with invite code

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "isPublic") {
      // Convert isPublic checkbox to privacy string
      setFormData({
        ...formData,
        privacy: checked ? "public" : "private"
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validation
      if (!formData.name.trim()) {
        throw new Error("Group name is required");
      }

      if (!formData.category) {
        throw new Error("Please select a category");
      }

      const groupData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        maxMembers: parseInt(formData.maxMembers),
        privacy: formData.privacy
      };

      const response = await fetch("http://localhost:3001/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(groupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create group");
      }

      console.log("Group created successfully:", data.data);
      
      // Store created group and show success screen with invite code
      setCreatedGroup(data.data);
      setStep(2);
      
      if (onSuccess) onSuccess(data.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      maxMembers: 10,
      privacy: "public",
    });
    setError("");
    setCreatedGroup(null);
    setStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const copyInviteCode = () => {
    if (createdGroup?.inviteCode) {
      navigator.clipboard.writeText(createdGroup.inviteCode);
      // Could add a toast notification here
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
            onClick={handleClose}
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
                    {step === 1 ? "Create New Group" : "Group Created!"}
                  </h2>
                  <button
                    onClick={handleClose}
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

              {step === 1 ? (
                /* Form */
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-300 mb-2"
                    >
                      Group Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Morning Runners"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                        text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                        transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-neutral-300 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="What's this group about?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                        text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                        transition-all duration-300 resize-none"
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
                      <option value="" disabled>
                        Select a category
                      </option>
                      {goalCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="maxMembers"
                      className="block text-sm font-medium text-neutral-300 mb-2"
                    >
                      Maximum Group Size
                    </label>
                    <input
                      type="number"
                      id="maxMembers"
                      name="maxMembers"
                      value={formData.maxMembers}
                      onChange={handleChange}
                      min={2}
                      max={100}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                        text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                        transition-all duration-300"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPublic"
                      name="isPublic"
                      checked={formData.privacy === "public"}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-neutral-700 text-[#00F0FF] focus:ring-[#00F0FF]/50"
                    />
                    <label
                      htmlFor="isPublic"
                      className="ml-2 block text-sm text-neutral-300"
                    >
                      Make this group public (anyone can find and join)
                    </label>
                  </div>

                  <div className="pt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700
                        text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
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
                        "Create Group"
                      )}
                    </motion.button>
                  </div>
                </form>
              ) : (
                /* Success screen with invite code */
                <div className="p-6 space-y-6">
                  {/* Success animation */}
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-green-500"
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
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Group Created Successfully!
                    </h3>
                    <p className="text-neutral-400">
                      Share the invite code with friends to join your group.
                    </p>
                  </div>

                  {/* Invite Code */}
                  <div className="bg-neutral-800/50 rounded-xl p-4">
                    <p className="text-sm text-neutral-400 mb-2">Invite Code:</p>
                    <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-lg">
                      <p className="font-mono text-lg font-bold text-[#00F0FF]">
                        {createdGroup?.inviteCode || "Code not available"}
                      </p>
                      <button
                        onClick={copyInviteCode}
                        className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
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
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      Note: You can always find this code in your group details.
                    </p>
                  </div>

                  {/* Group Details Summary */}
                  <div className="bg-neutral-800/50 rounded-xl p-4 space-y-3">
                    <div>
                      <p className="text-sm text-neutral-400">Group Name:</p>
                      <p className="text-white">{createdGroup?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Category:</p>
                      <p className="text-white capitalize">
                        {createdGroup?.category || "Other"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Privacy:</p>
                      <p className="text-white capitalize">
                        {createdGroup?.privacy || "Public"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleClose}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                        text-white font-medium hover:shadow-lg hover:shadow-[#00F0FF]/20 transition-all"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

CreateGroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default CreateGroupModal;
