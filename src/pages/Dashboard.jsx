import { motion } from "framer-motion";
import { useState } from "react";
import StatsOverview from "../components/dashboard/StatsOverview";
import RecentAchievements from "../components/dashboard/RecentAchievements";
import GoalsProgress from "../components/dashboard/GoalsProgress";
import CreateGoalModal from "../components/goals/CreateGoalModal";

const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              Welcome back, Sam!
            </h1>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-0 h-0.5 w-20 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full"></div>
          </div>

          <p className="text-neutral-400 mt-4">
            Youre on a 15-day streak! Keep the momentum going. 🔥
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 240, 255, 0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-xl text-white font-medium
            shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
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
          Add New Goal
        </motion.button>
      </header>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Achievements Section */}
        <div className="lg:col-span-2">
          <RecentAchievements />
        </div>

        {/* Goals Progress Section */}
        <div className="lg:col-span-1">
          <GoalsProgress />
        </div>
      </div>

      {/* Weekly Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-neutral-900/40 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">
          Weekly Consistency
        </h2>

        <div className="relative h-64 w-full">
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-neutral-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* Activity bars */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-between items-end h-52">
            {[65, 40, 85, 30, 50, 75, 90].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: 0.1 * index, type: "spring" }}
                className="w-[10%] rounded-t-lg bg-gradient-to-t from-[#00F0FF] to-[#FF006F]"
                style={{
                  opacity: height / 100,
                  filter: `brightness(${0.7 + height / 300})`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Create Goal Modal */}
      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          // Refresh data or show notification
        }}
      />
    </div>
  );
};

export default Dashboard;
