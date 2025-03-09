import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import UpdatePasswordModal from "../components/profile/UpdatePasswordModal";
import ConfirmationModal from "../components/shared/ConfirmationModal";
import ShareProfileModal from "../components/profile/ShareProfileModal";

// Mock user data
const mockUserData = {
  id: "user123",
  username: "SamAchieveIt",
  email: "sam@example.com",
  profileImage: null, // null means we'll use initials
  joinedDate: "2023-09-15T10:30:00Z",
  level: 12,
  totalXP: 12450,
  currentStreak: 15,
  longestStreak: 28,
  stats: {
    goalsCompleted: 87,
    goalsCreated: 104,
    achievementsUnlocked: 32,
    totalAchievements: 75,
    groupsJoined: 4,
    averageCompletionRate: 84,
  },
  activity: [
    { date: "2023-12-15", count: 3 },
    { date: "2023-12-14", count: 2 },
    { date: "2023-12-13", count: 4 },
    { date: "2023-12-12", count: 0 },
    { date: "2023-12-11", count: 5 },
    { date: "2023-12-10", count: 2 },
    { date: "2023-12-09", count: 1 },
    // More activity data would go here...
  ],
  topCategories: [
    { name: "Fitness", percentage: 35, color: "from-red-500 to-orange-500" },
    { name: "Reading", percentage: 25, color: "from-blue-500 to-cyan-500" },
    {
      name: "Productivity",
      percentage: 20,
      color: "from-green-500 to-emerald-500",
    },
    { name: "Learning", percentage: 15, color: "from-purple-500 to-pink-500" },
    { name: "Other", percentage: 5, color: "from-neutral-500 to-neutral-600" },
  ],
  badges: [
    {
      id: "badge1",
      name: "Early Starter",
      icon: "🌅",
      description: "Joined during the beta phase",
    },
    {
      id: "badge2",
      name: "Goal Crusher",
      icon: "🏆",
      description: "Completed 50+ goals",
    },
    {
      id: "badge3",
      name: "Team Player",
      icon: "🤝",
      description: "Member of 3+ groups",
    },
    {
      id: "badge4",
      name: "Fitness Fan",
      icon: "💪",
      description: "Completed 20+ fitness goals",
    },
  ],
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // Simulate API call
    setIsLoading(true);
    try {
      // In a real app, you'd fetch from your API
      // const response = await fetch("http://localhost:3001/api/user/profile", {
      //   credentials: "include",
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to fetch user data");
      // }

      // const data = await response.json();
      // setUserData(data.data);

      // Using mock data for now
      setTimeout(() => {
        setUserData(mockUserData);
        setEditedUserData(mockUserData);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUserData(userData);
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      // const response = await fetch("http://localhost:3001/api/user/profile", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     username: editedUserData.username,
      //     email: editedUserData.email,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to update profile");
      // }

      // const data = await response.json();
      // setUserData(data.data);

      // Simulating success
      setUserData({
        ...userData,
        username: editedUserData.username,
        email: editedUserData.email,
      });

      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
  };

  const handleLogout = async () => {
    try {
      // const response = await fetch("http://localhost:3001/api/auth/logout", {
      //   method: "POST",
      //   credentials: "include",
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to logout");
      // }

      // Redirect to login page
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // const response = await fetch("http://localhost:3001/api/user/delete", {
      //   method: "DELETE",
      //   credentials: "include",
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to delete account");
      // }

      // Redirect to signup page
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Calculate XP needed for next level
  const calculateLevelProgress = () => {
    if (!userData) return { currentXP: 0, nextLevelXP: 1000, progress: 0 };

    const xpPerLevel = 1000;
    const currentLevel = userData.level;
    const xpForCurrentLevel = currentLevel * xpPerLevel;
    const xpForNextLevel = (currentLevel + 1) * xpPerLevel;
    const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
    const currentLevelXP = userData.totalXP - xpForCurrentLevel;
    const progress = (currentLevelXP / xpNeededForNextLevel) * 100;

    return {
      currentXP: currentLevelXP,
      nextLevelXP: xpNeededForNextLevel,
      progress,
    };
  };

  const levelProgress = calculateLevelProgress();

  return (
    <div className="space-y-8">
      {/* Header Section with Decorative Elements */}
      <header className="relative">
        {/* Decorative gradient orb */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF006F]/20 rounded-full blur-3xl opacity-50" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
                My Profile
              </h1>
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-0 h-0.5 w-20 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full"></div>
            </div>

            <p className="text-neutral-400 mt-4">
              Manage your account and view your progress
            </p>
          </motion.div>

          <div className="flex gap-3">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowShareModal(true)}
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share Profile
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEditProfile}
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Profile
            </motion.button>
          </div>
        </div>
      </header>

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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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
                Error Loading Profile
              </h3>
              <p className="text-neutral-400">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchUserData}
            className="mt-4 ml-auto block px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Main Content */}
      {!isLoading && !error && userData && (
        <>
          {/* Profile Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 overflow-hidden"
            >
              {/* Profile Header with Gradient Background */}
              <div className="h-32 bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 relative">
                {isEditing ? (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 bg-neutral-900/60 backdrop-blur-sm rounded-lg text-neutral-400 hover:text-white transition-colors"
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
                    <button
                      onClick={handleSaveProfile}
                      className="p-2 bg-neutral-900/60 backdrop-blur-sm rounded-lg text-green-400 hover:text-green-300 transition-colors"
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 bg-neutral-900/60 backdrop-blur-sm rounded-lg text-xs text-neutral-400">
                      Member since{" "}
                      {new Date(userData.joinedDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
                <div className="absolute -bottom-16 left-6">
                  <div className="w-32 h-32 rounded-full border-4 border-neutral-900 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {getInitials(userData.username)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-20 p-6">
                <div className="mb-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-neutral-400 mb-1"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={editedUserData.username}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50
                            text-white focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                            transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-400 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editedUserData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50
                            text-white focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                            transition-all duration-300"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {userData.username}
                      </h2>
                      <p className="text-neutral-400">{userData.email}</p>
                    </>
                  )}
                </div>

                {/* Level Information */}
                <div className="bg-neutral-800/50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-white font-bold text-sm">
                        {userData.level}
                      </div>
                      <span className="text-neutral-300 font-medium">
                        Level {userData.level}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-[#00F0FF]/20 text-[#00F0FF] rounded-full">
                      {userData.totalXP} XP
                    </span>
                  </div>

                  {/* XP Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-500">Next Level</span>
                      <span className="text-neutral-400">
                        {levelProgress.currentXP}/{levelProgress.nextLevelXP} XP
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${levelProgress.progress}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F]"
                      />
                    </div>
                  </div>
                </div>

                {/* Streak Information */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-neutral-800/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-neutral-500 mb-1">
                      Current Streak
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-[#FF006F] text-xl font-bold">
                        {userData.currentStreak}
                      </span>
                      <svg
                        className="w-5 h-5 text-[#FF006F]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">days</p>
                  </div>
                  <div className="bg-neutral-800/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-neutral-500 mb-1">
                      Longest Streak
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-[#00F0FF] text-xl font-bold">
                        {userData.longestStreak}
                      </span>
                      <svg
                        className="w-5 h-5 text-[#00F0FF]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">days</p>
                  </div>
                </div>

                {/* Account Actions */}
                {!isEditing && (
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowUpdatePasswordModal(true)}
                      className="w-full py-2 px-4 rounded-lg bg-neutral-800/70 hover:bg-neutral-700/70
                        text-neutral-300 transition-colors flex items-center justify-center gap-2"
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
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                      Change Password
                    </button>
                    <button
                      onClick={() => setShowLogoutConfirmation(true)}
                      className="w-full py-2 px-4 rounded-lg bg-neutral-800/70 hover:bg-neutral-700/70
                                              text-neutral-300 transition-colors flex items-center justify-center gap-2"
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
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirmation(true)}
                      className="w-full py-2 px-4 rounded-lg bg-red-900/30 hover:bg-red-900/50
                                              text-red-400 transition-colors flex items-center justify-center gap-2"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete Account
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Stats and Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Tabs for different profile sections */}
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 p-1">
                  {["stats", "goals", "achievements", "badges"].map(
                    (category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all
                                              ${
                                                selected
                                                  ? "bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 text-white"
                                                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                                              }`
                        }
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Tab>
                    ),
                  )}
                </Tab.List>

                <Tab.Panels className="mt-2">
                  {/* Stats Panel */}
                  <Tab.Panel className="rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Statistics Overview
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-neutral-800/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">
                          Goals Completed
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {userData.stats.goalsCompleted}
                        </p>
                      </div>
                      <div className="bg-neutral-800/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">
                          Goals Created
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {userData.stats.goalsCreated}
                        </p>
                      </div>
                      <div className="bg-neutral-800/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">
                          Completion Rate
                        </p>
                        <p className="text-2xl font-bold text-[#00F0FF]">
                          {userData.stats.averageCompletionRate}%
                        </p>
                      </div>
                      <div className="bg-neutral-800/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">
                          Achievements
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {userData.stats.achievementsUnlocked}/
                          {userData.stats.totalAchievements}
                        </p>
                      </div>
                      <div className="bg-neutral-800/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">
                          Groups Joined
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {userData.stats.groupsJoined}
                        </p>
                      </div>
                      <div className="bg-neutral-800/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-500 mb-1">
                          Total XP
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {userData.totalXP}
                        </p>
                      </div>
                    </div>

                    {/* Category Distribution */}
                    <h4 className="text-lg font-medium text-white mb-4">
                      Goal Categories
                    </h4>
                    <div className="space-y-4">
                      {userData.topCategories.map((category, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-400">
                              {category.name}
                            </span>
                            <span className="text-neutral-300">
                              {category.percentage}%
                            </span>
                          </div>
                          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${category.percentage}%` }}
                              transition={{
                                duration: 1,
                                delay: 0.2 + idx * 0.1,
                              }}
                              className={`h-full bg-gradient-to-r ${category.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>

                  {/* Goals Panel */}
                  <Tab.Panel className="rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">
                        Recent Goals
                      </h3>
                      <a
                        href="/goals"
                        className="text-sm text-[#00F0FF] hover:text-[#FF006F] transition-colors"
                      >
                        View All Goals
                      </a>
                    </div>

                    {/* Activity Calendar Visualization */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-white">
                          Activity Calendar
                        </h4>
                        <div className="text-xs px-2 py-1 bg-neutral-800/70 rounded-full text-neutral-400">
                          Last 7 Days
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {userData.activity.slice(0, 7).map((day, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="text-xs text-center text-neutral-500">
                              {new Date(day.date).toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                            <div
                              className={`h-16 rounded-lg flex items-center justify-center
                                                    ${
                                                      day.count > 0
                                                        ? `bg-gradient-to-br from-[#00F0FF]/10 to-[#FF006F]/10 border border-[#00F0FF]/20`
                                                        : "bg-neutral-800/30 border border-neutral-800/50"
                                                    }`}
                            >
                              <span
                                className={`text-lg font-bold ${day.count > 0 ? "text-white" : "text-neutral-600"}`}
                              >
                                {day.count}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Completion Rate */}
                    <div className="bg-neutral-800/30 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-white">
                          Goal Completion Rate
                        </h4>
                        <div className="text-sm font-bold text-[#00F0FF]">
                          {userData.stats.averageCompletionRate}%
                        </div>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${userData.stats.averageCompletionRate}%`,
                          }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F]"
                        />
                      </div>
                      <p className="mt-2 text-xs text-neutral-500">
                        Youve completed {userData.stats.goalsCompleted} out of{" "}
                        {userData.stats.goalsCreated} goals.
                      </p>
                    </div>

                    {/* Quick Action */}
                    <a
                      href="/goals/create"
                      className="block w-full py-3 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                                              rounded-xl text-white font-medium text-center hover:opacity-90 transition-all"
                    >
                      Create New Goal
                    </a>
                  </Tab.Panel>

                  {/* Achievements Panel */}
                  <Tab.Panel className="rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">
                        Achievements
                      </h3>
                      <a
                        href="/achievements"
                        className="text-sm text-[#00F0FF] hover:text-[#FF006F] transition-colors"
                      >
                        View All Achievements
                      </a>
                    </div>

                    {/* Achievement Progress */}
                    <div className="bg-neutral-800/30 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-white">
                          Achievement Progress
                        </h4>
                        <div className="text-sm font-bold text-[#00F0FF]">
                          {userData.stats.achievementsUnlocked}/
                          {userData.stats.totalAchievements}
                        </div>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(userData.stats.achievementsUnlocked / userData.stats.totalAchievements) * 100}%`,
                          }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F]"
                        />
                      </div>
                      <p className="mt-2 text-xs text-neutral-500">
                        Youve unlocked{" "}
                        {Math.round(
                          (userData.stats.achievementsUnlocked /
                            userData.stats.totalAchievements) *
                            100,
                        )}
                        % of all achievements.
                      </p>
                    </div>

                    {/* Recent Achievements - Placeholder for now */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((_, idx) => (
                        <div
                          key={idx}
                          className="bg-neutral-800/30 border border-neutral-800/50 rounded-lg p-4 flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 flex items-center justify-center text-xl">
                            🏆
                          </div>
                          <div>
                            <h5 className="font-medium text-white">
                              Achievement {idx + 1}
                            </h5>
                            <p className="text-xs text-neutral-500">
                              Unlocked recently
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>

                  {/* Badges Panel */}
                  <Tab.Panel className="rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Your Badges
                    </h3>

                    {/* Badges Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {userData.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="bg-neutral-800/30 border border-neutral-800/50 rounded-lg p-4 text-center"
                        >
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 flex items-center justify-center text-3xl">
                            {badge.icon}
                          </div>
                          <h5 className="font-medium text-white mb-1">
                            {badge.name}
                          </h5>
                          <p className="text-xs text-neutral-500">
                            {badge.description}
                          </p>
                        </div>
                      ))}

                      {/* Placeholder for locked badges */}
                      {Array.from({
                        length: Math.max(0, 8 - userData.badges.length),
                      }).map((_, idx) => (
                        <div
                          key={`locked-${idx}`}
                          className="bg-neutral-800/30 border border-neutral-800/50 rounded-lg p-4 text-center opacity-50"
                        >
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-neutral-800/50 flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-neutral-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </div>
                          <h5 className="font-medium text-neutral-500 mb-1">
                            Locked Badge
                          </h5>
                          <p className="text-xs text-neutral-600">
                            Keep going to unlock
                          </p>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </motion.div>
          </div>
        </>
      )}

      {/* Modals */}
      <UpdatePasswordModal
        isOpen={showUpdatePasswordModal}
        onClose={() => setShowUpdatePasswordModal(false)}
      />

      <ConfirmationModal
        isOpen={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        message="Are you sure you want to logout of your account?"
        confirmText="Logout"
        confirmColor="bg-[#00F0FF]"
      />

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost."
        confirmText="Delete Account"
        confirmColor="bg-red-500"
      />

      <ShareProfileModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        userData={userData}
      />
    </div>
  );
};

export default Profile;
