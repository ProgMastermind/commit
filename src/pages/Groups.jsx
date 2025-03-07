import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CreateGroupModal from "../components/groups/CreateGroupModal";
import JoinGroupModal from "../components/groups/JoinGroupModal";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("myGroups");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      filterGroups();
    }
  });

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
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

  const filterGroups = () => {
    let filtered = [...groups];

    // Filter by active tab (my groups vs discovered)
    if (activeTab === "myGroups") {
      filtered = filtered.filter((group) => group.isMember);
    } else if (activeTab === "discover") {
      filtered = filtered.filter((group) => !group.isMember);
    }

    // Filter by search term
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(query) ||
          (group.description &&
            group.description.toLowerCase().includes(query)),
      );
    }

    setFilteredGroups(filtered);
  };

  const handleGroupCreated = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, { ...newGroup, isMember: true }]);
    setIsCreateModalOpen(false);
  };

  const handleGroupJoined = (joinedGroup) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group._id === joinedGroup._id ? { ...group, isMember: true } : group,
      ),
    );
    setIsJoinModalOpen(false);
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
    };
    return icons[category] || "🎯";
  };

  // Calculate group stats
  const getGroupStats = () => {
    const myGroups = groups.filter((group) => group.isMember);
    const activeGoals = myGroups.reduce(
      (sum, group) => sum + (group.activeGoals || 0),
      0,
    );
    const totalMembers = myGroups.reduce(
      (sum, group) => sum + (group.members?.length || 0),
      0,
    );

    return {
      count: myGroups.length,
      activeGoals,
      totalMembers,
    };
  };

  const stats = getGroupStats();

  return (
    <div className="space-y-8">
      {/* Header Section with Decorative Elements */}
      <header className="relative">
        {/* Decorative gradient orb */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF006F]/20 rounded-full blur-3xl opacity-50" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
                Accountability Groups
              </h1>
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-0 h-0.5 w-20 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full"></div>
            </div>

            <p className="text-neutral-400 mt-4">
              Join forces with others for better accountability and motivation
            </p>
          </motion.div>

          <div className="flex gap-3">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 240, 255, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsJoinModalOpen(true)}
              className="px-5 py-3 bg-neutral-800/80 hover:bg-neutral-700/80
                rounded-xl text-white font-medium border border-neutral-700/50
                transition-all duration-300 flex items-center gap-2"
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Join Group
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 240, 255, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                rounded-xl text-white font-medium shadow-lg hover:shadow-xl
                transition-all duration-300 flex items-center gap-2"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create New Group
            </motion.button>
          </div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-neutral-300 font-medium">My Groups</h3>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">{stats.count}</p>
              <p className="text-sm text-green-400 mb-1">
                {stats.count > 0 ? "Active" : "Join one!"}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-fuchsia-400 to-pink-500 text-white">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-neutral-300 font-medium">Active Goals</h3>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">
                {stats.activeGoals}
              </p>
              <p className="text-sm text-green-400 mb-1">In progress</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6 relative overflow-hidden group"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-neutral-300 font-medium">Team Members</h3>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">
                {stats.totalMembers}
              </p>
              <p className="text-sm text-green-400 mb-1">Collaborators</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Tabs */}
        <div className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-1 flex">
          <button
            onClick={() => setActiveTab("myGroups")}
            className={`flex-1 px-4 py-2.5 text-center font-medium rounded-lg transition-colors
              ${
                activeTab === "myGroups"
                  ? "bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
          >
            <span className="flex items-center justify-center gap-2">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              My Groups
            </span>
          </button>
          <button
            onClick={() => setActiveTab("discover")}
            className={`flex-1 px-4 py-2.5 text-center font-medium rounded-lg transition-colors
              ${
                activeTab === "discover"
                  ? "bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
          >
            <span className="flex items-center justify-center gap-2">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Discover
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50
              text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
              transition-all duration-300"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="relative w-20 h-20">
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-neutral-800"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-[#00F0FF] animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00F0FF]">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl"
        >
          <div className="flex gap-4 items-center">
            <div className="rounded-full bg-red-500/20 p-3 text-red-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">
                Error Loading Groups
              </h3>
              <p className="text-neutral-400">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchGroups}
            className="mt-4 ml-auto block px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Groups Grid */}
      {!isLoading && !error && (
        <>
          {filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <motion.div
                  key={group._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50
                    hover:border-[#00F0FF]/50 transition-all duration-300 overflow-hidden group"
                >
                  {/* Group Header with Category Banner */}
                  <div className="h-24 bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 relative flex items-end">
                    {/* Category Icon */}
                    <div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-neutral-900/80
                      backdrop-blur-sm flex items-center justify-center text-xl"
                    >
                      {getCategoryIcon(group.category)}
                    </div>

                    {/* Group Info */}
                    <div className="p-4 w-full bg-neutral-900/50 backdrop-blur-sm">
                      <h3 className="font-semibold text-white text-lg group-hover:text-[#00F0FF] transition-colors duration-300">
                        {group.name}
                      </h3>
                    </div>
                  </div>

                  {/* Group Body */}
                  <div className="p-6">
                    {/* Description */}
                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                      {group.description || "No description provided."}
                    </p>

                    {/* Group Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-neutral-800/40 rounded-lg p-2 text-center">
                        <p className="text-xs text-neutral-500">Members</p>
                        <p className="text-lg font-bold text-white">
                          {group.members?.length || 0}
                        </p>
                      </div>
                      <div className="bg-neutral-800/40 rounded-lg p-2 text-center">
                        <p className="text-xs text-neutral-500">Goals</p>
                        <p className="text-lg font-bold text-white">
                          {group.activeGoals || 0}
                        </p>
                      </div>
                      <div className="bg-neutral-800/40 rounded-lg p-2 text-center">
                        <p className="text-xs text-neutral-500">Success</p>
                        <p className="text-lg font-bold text-[#00F0FF]">
                          {group.successRate || 0}%
                        </p>
                      </div>
                    </div>

                    {/* Group Activity */}
                    {group.isMember && group.recentActivity && (
                      <div className="mb-4 bg-neutral-800/30 rounded-lg p-3">
                        <p className="text-xs text-neutral-500 mb-1">
                          Recent Activity
                        </p>
                        <p className="text-sm text-white">
                          {group.recentActivity}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {group.isMember ? (
                        <button
                          className="flex-1 px-3 py-2 bg-neutral-800/80 rounded-lg text-white
                          hover:bg-neutral-700/80 transition-colors flex items-center justify-center gap-2"
                        >
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View Details
                        </button>
                      ) : (
                        <button
                          className="flex-1 px-3 py-2 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                          rounded-lg text-white transition-all flex items-center justify-center gap-2
                          hover:shadow-lg hover:shadow-[#00F0FF]/20"
                        >
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
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                          Join Group
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-neutral-900/30 rounded-xl border border-neutral-800/50"
            >
              <div className="w-20 h-20 mx-auto bg-neutral-800/50 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                No groups found
              </h3>
              <p className="text-neutral-400 max-w-md mx-auto mb-6">
                {searchQuery
                  ? `No groups matching "${searchQuery}" found. Try a different search term.`
                  : activeTab === "myGroups"
                    ? "You haven't joined any groups yet. Create a new group or discover existing ones!"
                    : "No groups available for discovery at the moment. Check back later or create your own!"}
              </p>
              <div className="flex justify-center gap-4">
                {activeTab === "myGroups" && (
                  <button
                    onClick={() => setActiveTab("discover")}
                    className="px-6 py-3 bg-neutral-800/80 hover:bg-neutral-700/80
                      rounded-xl text-white font-medium transition-all duration-300
                      flex items-center gap-2"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Discover Groups
                  </button>
                )}
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                                      rounded-xl text-white font-medium hover:opacity-90 transition-all duration-300
                                      flex items-center gap-2"
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Create New Group
                </button>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleGroupCreated}
      />

      {/* Join Group Modal */}
      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSuccess={handleGroupJoined}
      />
    </div>
  );
};

export default Groups;
