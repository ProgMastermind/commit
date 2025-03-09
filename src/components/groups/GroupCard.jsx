import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import AddMemberModal from "./AddMemberModal";

const GroupCard = ({ group, onGroupUpdate }) => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const memberCount = group.members?.length || 0;
  const maxSize = group.maxMembers || group.maxSize || 10;
  const percentFull = (memberCount / maxSize) * 100;
  
  const copyInviteCode = () => {
    if (group.inviteCode) {
      navigator.clipboard.writeText(group.inviteCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      fitness: "💪",
      reading: "📚",
      learning: "🧠",
      meditation: "🧘",
      nutrition: "🥗",
      productivity: "⏱️",
      creativity: "🎨",
      social: "👋",
      finance: "💰",
      career: "💼",
      other: "🎯"
    };
    return icons[category] || "🎯";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111111] rounded-xl p-6 border border-neutral-800
        hover:border-[#00F0FF] transition-all duration-300"
    >
      {/* Group Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-xl">
            {getCategoryIcon(group.category)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{group.name}</h3>
            <p className="text-neutral-400 text-sm">
              Created on {new Date(group.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium
              ${
                percentFull >= 90
                  ? "bg-red-500/10 text-red-500"
                  : percentFull >= 70
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "bg-green-500/10 text-green-500"
              }`}
          >
            {memberCount}/{maxSize} Members
          </span>
        </div>
      </div>

      {/* Invite Code Section */}
      {group.inviteCode && (
        <div className="mb-6 p-3 bg-neutral-900/50 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-sm text-neutral-400">Invite Code:</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono font-bold text-[#00F0FF]">
                {showInviteCode ? group.inviteCode : "••••••"}
              </p>
              <button
                onClick={() => setShowInviteCode(!showInviteCode)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showInviteCode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                </svg>
              </button>
              <button
                onClick={copyInviteCode}
                className="p-1 text-neutral-400 hover:text-white"
              >
                {copySuccess ? (
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members Progress */}
      <div className="mb-6">
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentFull}%` }}
            className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F]"
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Group Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-sm text-neutral-400 mb-1">Active Goals</p>
          <p className="text-xl font-bold text-[#00F0FF]">
            {group.activeGoals || group.goals?.length || 0}
          </p>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-sm text-neutral-400 mb-1">Completion Rate</p>
          <p className="text-xl font-bold text-[#FFD700]">
            {group.completionRate || 0}%
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddMemberModalOpen(true)}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
            rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300"
          disabled={memberCount >= maxSize}
        >
          Add Member
        </motion.button>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        groupId={group._id}
        onSuccess={onGroupUpdate}
      />
    </motion.div>
  );
};

GroupCard.propTypes = {
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    maxSize: PropTypes.number,
    maxMembers: PropTypes.number,
    members: PropTypes.array,
    goals: PropTypes.array,
    activeGoals: PropTypes.number,
    completionRate: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    inviteCode: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onGroupUpdate: PropTypes.func.isRequired,
};

export default GroupCard;
