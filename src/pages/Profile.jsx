import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileCard from "../components/profile/ProfileCard";
import AchievementGraph from "../components/profile/AchievementGraph";
import StatsOverview from "../components/profile/StatsOverview";
import ShareModal from "../components/profile/ShareModal";
import { useNavigate } from "react-router-dom";

// Mock user data
const mockUserData = {
  username: "ProGamer",
  email: "progamer@example.com",
  joinDate: "January 2024",
  stats: {
    totalPoints: 15750,
    tokens: 2500,
    achievementsCompleted: 145,
    totalAchievements: 200,
    currentStreak: 15,
    longestStreak: 30,
    completionRate: 72.5,
  },
  achievements: {
    // Last 365 days of activity
    contributions: Array.from({ length: 365 }, () => ({
      date: new Date(),
      count: Math.floor(Math.random() * 5), // 0-4 achievements per day
    })),
    recent: [
      {
        id: 1,
        title: "Victory Royale",
        game: "Fortnite",
        date: "2024-02-15",
        points: 500,
      },
      {
        id: 2,
        title: "Legendary Status",
        game: "PUBG",
        date: "2024-02-14",
        points: 1000,
      },
      {
        id: 3,
        title: "Speed Runner",
        game: "Apex Legends",
        date: "2024-02-13",
        points: 750,
      },
    ],
  },
  goals: {
    completed: 45,
    total: 60,
    recent: [
      {
        id: 1,
        title: "Win 10 Matches",
        game: "PUBG",
        progress: 80,
      },
      {
        id: 2,
        title: "Reach Diamond",
        game: "League of Legends",
        progress: 65,
      },
    ],
  },
};

const Profile = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserData(mockUserData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Redirect to landing page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleShare = (platform) => {
    if (platform === "twitter") {
      const twitterText = `🎮 Check out my gaming achievements!\n
          🏆 ${userData.stats.achievementsCompleted} Achievements\n
          🔥 ${userData.stats.currentStreak} Day Streak\n
          ⭐ ${userData.stats.totalPoints} Points\n
          Join me on Commit! #GamingAchievements`;

      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
      window.open(twitterUrl, "_blank");
    } else if (platform === "linkedin") {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      window.open(linkedinUrl, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00F0FF]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
          Player Profile
        </h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsShareModalOpen(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
                rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300"
          >
            Share Profile
          </motion.button>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600
                rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoggingOut ? (
              <div className="flex items-center">
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
                Logging out...
              </div>
            ) : (
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </div>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <ProfileCard userData={userData} onShare={handleShare} />
        </div>

        {/* Stats and Graphs */}
        <div className="lg:col-span-2 space-y-8">
          <StatsOverview stats={userData.stats} />
          <AchievementGraph
            contributions={userData.achievements.contributions}
          />
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userData={userData}
        onShare={handleShare}
      />
    </div>
  );
};

export default Profile;
