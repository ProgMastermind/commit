import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";

const CreateGroupModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    maxSize: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/groups/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create group");
      }

      onSuccess(data.data);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
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
                  Create New Group
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
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-400 mb-2"
                  >
                    Group Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
                      text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
                      transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="maxSize"
                    className="block text-sm font-medium text-neutral-400 mb-2"
                  >
                    Maximum Members
                  </label>
                  <select
                    id="maxSize"
                    value={formData.maxSize}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxSize: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
                      text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
                      transition-all duration-300"
                  >
                    {[5, 10, 15, 20].map((size) => (
                      <option key={size} value={size}>
                        {size} Members
                      </option>
                    ))}
                  </select>
                </div>
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
                  disabled={isLoading}
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
                    "Create Group"
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

CreateGroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CreateGroupModal;
