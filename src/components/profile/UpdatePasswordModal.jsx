import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

const UpdatePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password update logic here
    console.log("Password update data:", formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#111111] rounded-xl w-full max-w-md border border-neutral-800 shadow-xl">
              {/* Header */}
              <div className="p-6 border-b border-neutral-800">
                <h2 className="text-xl font-bold text-white">
                  Update Password
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-neutral-400 mb-2"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
                      text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
                      transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-neutral-400 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
                      text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
                      transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-neutral-400 mb-2"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
                      text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
                      transition-all duration-300"
                    required
                  />
                </div>
              </form>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-800 flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-white font-medium
                    hover:bg-neutral-800 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                    rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300"
                >
                  Update Password
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

UpdatePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdatePasswordModal;
