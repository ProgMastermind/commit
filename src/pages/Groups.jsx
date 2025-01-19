import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CreateGroupModal from "../components/groups/CreateGroupModal";
import GroupList from "../components/groups/GroupList";

const Groups = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
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
      setGroups(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGroupCreated = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
            Your Groups
          </h1>
          <p className="text-neutral-400 mt-1">
            Manage your gaming circles and collaborate with others
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
            rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300"
        >
          Create New Group
        </motion.button>
      </header>

      {/* Group Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] rounded-xl p-6 border border-neutral-800"
        >
          <p className="text-neutral-400">Total Groups</p>
          <p className="text-3xl font-bold text-[#00F0FF]">{groups.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111111] rounded-xl p-6 border border-neutral-800"
        >
          <p className="text-neutral-400">Active Members</p>
          <p className="text-3xl font-bold text-[#FF006F]">
            {groups.reduce(
              (acc, group) => acc + (group.members?.length || 0),
              0,
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111111] rounded-xl p-6 border border-neutral-800"
        >
          <p className="text-neutral-400">Group Goals</p>
          <p className="text-3xl font-bold text-[#FFD700]">
            {groups.reduce((acc, group) => acc + (group.goals?.length || 0), 0)}
          </p>
        </motion.div>
      </div>

      {/* Groups List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00F0FF]" />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      ) : (
        <GroupList groups={groups} onGroupsUpdate={fetchGroups} />
      )}

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleGroupCreated}
      />
    </div>
  );
};

export default Groups;
