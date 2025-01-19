import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

const AccountSettings = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle update logic here
    console.log("Updated data:", formData);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111111] rounded-xl border border-neutral-800 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Account Settings</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-neutral-400 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            disabled={!isEditing}
            className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
              text-white disabled:opacity-50 disabled:cursor-not-allowed
              focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
              transition-all duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-400 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={!isEditing}
            className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800
              text-white disabled:opacity-50 disabled:cursor-not-allowed
              focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]
              transition-all duration-300"
          />
        </div>

        {isEditing && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            type="submit"
            className="w-full px-6 py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
              rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300"
          >
            Save Changes
          </motion.button>
        )}
      </form>
    </motion.div>
  );
};

AccountSettings.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountSettings;
