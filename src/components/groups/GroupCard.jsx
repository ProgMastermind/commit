import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import AddMemberModal from "./AddMemberModal";

const GroupCard = ({ group, onGroupUpdate }) => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const memberCount = group.members?.length || 0;
  const maxSize = group.maxSize || 10;
  const percentFull = (memberCount / maxSize) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111111] rounded-xl p-6 border border-neutral-800
        hover:border-[#00F0FF] transition-all duration-300"
    >
      {/* Group Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{group.name}</h3>
          <p className="text-neutral-400 text-sm">
            Created on {new Date(group.createdAt).toLocaleDateString()}
          </p>
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
            {group.goals?.length || 0}
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
    maxSize: PropTypes.number.isRequired,
    members: PropTypes.array,
    goals: PropTypes.array,
    completionRate: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onGroupUpdate: PropTypes.func.isRequired,
};

export default GroupCard;
